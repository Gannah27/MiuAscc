// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKM8D3eqY9OUNwJRdtB8PIhoATRdXNwyE",
  authDomain: "test-b97de.firebaseapp.com",
  databaseURL: "test-b97de-default-rtdb.firebaseio.com",
  projectId: "test-b97de",
  storageBucket: "test-b97de.appspot.com",
  messagingSenderId: "850574678771",
  appId: "1:850574678771:web:6ca0b7c990d75bdb7d3586",
  measurementId: "G-WFXK8K77WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);