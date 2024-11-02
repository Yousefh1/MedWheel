// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdenbOo6KqBzjszuwL6nuHhszlzhcZsf8",
  authDomain: "whellthings.firebaseapp.com",
  projectId: "whellthings",
  storageBucket: "whellthings.firebasestorage.app",
  messagingSenderId: "495360004209",
  appId: "1:495360004209:web:fdba113d1fff6e332a0bd0",
  measurementId: "G-C8ZZPF9YN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();