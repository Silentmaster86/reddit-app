import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const { selectedSubreddit } = getState().posts;
    const subreddit = selectedSubreddit || "popular";

    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map(({ data }) => ({
      id: data.id,
      title: data.title,
      author: data.author,
      subreddit: data.subreddit,
      permalink: data.permalink,
      thumbnail: data.thumbnail,
      url: data.url,
      ups: data.ups,
      num_comments: data.num_comments,
      created_utc: data.created_utc
    }));
  }
);


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    subreddits: [],
    selectedSubreddit: 'popular',
    category: 'all',
    searchTerm: '',
  },
  reducers: {
    setSubreddits(state, action) {
      state.subreddits = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
    // Optional if used
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setSubreddits,
  setSelectedSubreddit,
  setCategory,
  setSearchTerm
} = postsSlice.actions;

export default postsSlice.reducer;
