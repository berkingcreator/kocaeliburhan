import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC73wHBoQ65yeMihbX4NtDLwEcXv817OIE",
  authDomain: "kocaeli-13e79.firebaseapp.com",
  projectId: "kocaeli-13e79",
  storageBucket: "kocaeli-13e79.firebasestorage.app",
  messagingSenderId: "133039061602",
  appId: "1:133039061602:web:8b483081bdbc1f2dd5af3b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);