// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaeEIDcqt3fK0itVZsYaui_98Btwc9U7s",
  authDomain: "bao-tri-sua-chua.firebaseapp.com",
  projectId: "bao-tri-sua-chua",
  storageBucket: "bao-tri-sua-chua.appspot.com",
  messagingSenderId: "177159152388",
  appId: "1:177159152388:web:437fac7003b03d7724a651",
  measurementId: "G-V42J9NW2TB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
