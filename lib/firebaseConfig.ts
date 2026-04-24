import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU-3TwZewBzWkZqDOWmDjLcHMFoqKNy80",
  authDomain: "aandm-a0fd5.firebaseapp.com",
  projectId: "aandm-a0fd5",
  storageBucket: "aandm-a0fd5.firebasestorage.app",
  messagingSenderId: "271638307872",
  appId: "1:271638307872:web:cf7a438f85edf3e2228845",
  measurementId: "G-C5P1362Z5B",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
