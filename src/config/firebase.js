import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyApNmSyqC4WhZiaUYCqZADuVrrDox3BOic",
    authDomain: "studentmangmentsystem-87e83.firebaseapp.com",
    projectId: "studentmangmentsystem-87e83",
    storageBucket: "studentmangmentsystem-87e83.appspot.com",
    messagingSenderId: "274776916104",
    appId: "1:274776916104:web:643eb3d762d1624ad51f3d",
    measurementId: "G-62BPQWVW6W"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }