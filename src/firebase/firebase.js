import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebseConfig = {
    apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    messagingSenderID: String(import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID),
    appId: String(import.meta.env.VITE_FIREBASE_APPID),
    // databaseURL: String(import.meta.env.VITE_FIREBASE_DATABASEURL)
}

// exporting app & auth
export const app = initializeApp(firebseConfig)
export const auth = getAuth(app)