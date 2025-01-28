import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCheUl8CB4JefJEkQ2XiOv4Z2vy1fqu0AA",
    authDomain: "ecom-a1e8c.firebaseapp.com",
    databaseURL: "https://ecom-a1e8c-default-rtdb.firebaseio.com",
    projectId: "ecom-a1e8c",
    storageBucket: "ecom-a1e8c.firebasestorage.app",
    messagingSenderId: "610767168068",
    appId: "1:610767168068:web:ff3efebe096310b3cd1211"
};

// exporting app & auth
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)