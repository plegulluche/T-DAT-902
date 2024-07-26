import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8DC2s04RjQQQJuqaDnpgLQVzMWIfL0mc",
    authDomain: "homepedia-5abd3.firebaseapp.com",
    projectId: "homepedia-5abd3",
    storageBucket: "homepedia-5abd3.appspot.com",
    messagingSenderId: "848070624996",
    appId: "1:848070624996:web:450975349ff9da9b6d0ef1",
    measurementId: "G-WHMPJWR2GC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };