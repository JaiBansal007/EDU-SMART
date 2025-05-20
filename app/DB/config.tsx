// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP3Ay4nehj6_xxKAv0aCpCEZ1zOBDe_FA",
  authDomain: "edusmart-2cb65.firebaseapp.com",
  projectId: "edusmart-2cb65",
  storageBucket: "edusmart-2cb65.firebasestorage.app",
  messagingSenderId: "1033039407301",
  appId: "1:1033039407301:web:fd4f4bbc59c01befd8e8ac",
  measurementId: "G-5KW6D5QQRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

export { app, analytics, auth, db, googleProvider };