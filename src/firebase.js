import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBt2PZbT1CG4fEp4NrPD33c6DRzVBlCbiE",
  authDomain: "mading-jwp-d4e14.firebaseapp.com",
  projectId: "mading-jwp-d4e14",
  storageBucket: "mading-jwp-d4e14.appspot.com",
  messagingSenderId: "163393653488",
  appId: "1:163393653488:web:c33ee5ef30491c6854d035",
  databaseURL:
    "https://mading-jwp-d4e14-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
