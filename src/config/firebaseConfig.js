import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// First Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH7rMz_5TCit-tNlaQxv3hZ5kFdPEuvQg",
  authDomain: "bestfortunehotel-35008.firebaseapp.com",
  projectId: "bestfortunehotel-35008",
  storageBucket: "bestfortunehotel-35008.firebasestorage.app",
  messagingSenderId: "36197691105",
  appId: "1:36197691105:web:4b167e39341f9e19b151a0",
  measurementId: "G-8ML826VHFM"
};

// Initialize Firebase apps with unique names
const app = initializeApp(firebaseConfig);

// Get Firestore, Auth, and Storage for the respective apps
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export {
  app,
  db,
  auth,
  googleProvider,
  facebookProvider
};
