
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
 /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID*/

  apiKey: "AIzaSyDMbBrS1aA_bgdHve-PbFPrYyBO0_Ynon4",
  authDomain: "react-firebase-assessment.firebaseapp.com",
  databaseURL: "https://react-firebase-assessment-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-firebase-assessment",
  storageBucket: "react-firebase-assessment.appspot.com",
  messagingSenderId: "37088426748",
  appId: "1:37088426748:web:3b19b3b3ffa701c146b579",
  measurementId: "G-81BQD252RF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app