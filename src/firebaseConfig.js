import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGWltWiZHqyP9ygeI6zqDYHUKivGBleAk",
    authDomain: "construction-website-91dac.firebaseapp.com",
    databaseURL: "https://construction-website-91dac-default-rtdb.firebaseio.com",
    projectId: "construction-website-91dac",
    storageBucket: "construction-website-91dac.firebasestorage.app",
    messagingSenderId: "871639470267",
    appId: "1:871639470267:web:927f697800eae67b0d599e",
    measurementId: "G-489WZ1N174",
    name: "KoKo JCB" // Updated app name
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "KoKo JCB"); // Updated app name
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
