import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/** Firebase project the website reads from and the /admin portal writes to */
export const FIREBASE_PROJECT = "am-website-5173f";
/** This project's Firestore database is named "default" (not the older "(default)") */
export const FIRESTORE_DATABASE = "default";

const firebaseConfig = {
  apiKey: "AIzaSyAMiiaLwlAL7TkGSoH9tYXEOl7IcT4C78M",
  authDomain: `${FIREBASE_PROJECT}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT,
  storageBucket: `${FIREBASE_PROJECT}.firebasestorage.app`,
  messagingSenderId: "130766324611",
  appId: "1:130766324611:web:afe16e3fb0eff85fd36cb6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, FIRESTORE_DATABASE);
