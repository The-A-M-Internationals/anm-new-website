"use client";

/**
 * Firebase for the admin portal only (login + photo uploads). Kept out of lib/firebaseConfig.ts so
 * public pages never download the Auth/Storage code.
 */
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import { db } from "../firebaseConfig";

const app = getApp();
export const auth = getAuth(app);
export const storage = getStorage(app);
export { db };
