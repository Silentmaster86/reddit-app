import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Fetch a list of posts from a subreddit
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const { selectedSubreddit } = getState().posts;
    try {
      const response = await fetch(`https://www.reddit.com/r/${selectedSubreddit}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts from subreddit: ${selectedSubreddit}`);
      }
      const data = await response.json();
      return data.data.children.map((child) => child.data); // Return array of posts
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
// Fetch a single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    try {
      const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch post details for ID: ${postId}`);
      }
      const data = await response.json();
      
      const postData = data?.[0]?.data?.children?.[0]?.data || null;
      const commentsData = data?.[1]?.data?.children
        ?.map((child) => child.data)
        ?.filter((comment) => comment.body) || [];

      return { post: postData, comments: commentsData };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  posts: [],
  post: null,
  comments: [],
  status: "idle",
  error: null,
  searchTerm: "", //New state for search
  selectedSubreddit: "popular", //Default subreddit
  category: "all",
  subreddits: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
    setSubreddits(state, action) {
      state.subreddits = action.payload; // Store fetched subreddits
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload; // Store fetched posts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded"; // Save the fetched post
        state.post = action.payload.post; // Store the fetched post
        state.comments = action.payload.comments; // Store the comments of the post
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setSearchTerm, setSelectedSubreddit, setCategory, setSubreddits } = postsSlice.actions;
export default postsSlice.reducer;