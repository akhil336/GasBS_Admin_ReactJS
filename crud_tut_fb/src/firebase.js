import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCzPqGahVjpMetnswgI0p7hEv0kiaC7iMw",
  authDomain: "hospital-ms-12d79.firebaseapp.com",
  databaseURL: "https://hospital-ms-12d79-default-rtdb.firebaseio.com",
  projectId: "hospital-ms-12d79",
  storageBucket: "hospital-ms-12d79.appspot.com",
  messagingSenderId: "124676131316",
  appId: "1:124676131316:web:f754f28868c6312c88d1a1",
  measurementId: "G-8423E9E1BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getDatabase(app);
