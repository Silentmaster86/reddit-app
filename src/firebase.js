// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJ91omrB4P1IUkNvrO0YoJMLSO4iAjido",
  authDomain: "redditapp-2025.firebaseapp.com",
  projectId: "redditapp-2025",
  storageBucket: "redditapp-2025.firebasestorage.app",
  messagingSenderId: "789827274878",
  appId: "1:789827274878:web:659dbc37101f5305cfb02f",
  measurementId: "G-W96J8MYG7F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
