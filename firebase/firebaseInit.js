// Import Firebase modules from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword, // For signup
  signInWithEmailAndPassword, // For login
  signOut, // For logout
  updateProfile, // For setting displayName, photoURL, etc.
  onAuthStateChanged, // For detecting if a user is logged in/out
  fetchSignInMethodsForEmail, // For checking if email exists
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

import { firebaseConfig } from '../config/firebaseConfig.js';

// Initialize Firebase app with our config
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth instance from your app
const auth = getAuth(app);

// Export the app and auth so you can use them in other files
export {
  auth,
  app,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
};
