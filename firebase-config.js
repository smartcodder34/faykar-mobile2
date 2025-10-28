// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADU1u-5aottoX-6Y3KoaMEDMQ67ARvuXI",
  authDomain: "fakyar-chat.firebaseapp.com",
  projectId: "fakyar-chat",
  storageBucket: "fakyar-chat.firebasestorage.app",
  messagingSenderId: "801504136601",
  appId: "1:801504136601:web:2fa31825ac06be40f71708",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");
// export const usersColRef = collection(db, "users");
// export const messagesColRef = collection(db, "messages");
