import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyATjjuRavTJxeAvBj0w6lPfj-ZJf4CXw9s",
  authDomain: "shopping-list-1e7b4.firebaseapp.com",
  projectId: "shopping-list-1e7b4",
  storageBucket: "shopping-list-1e7b4.appspot.com",
  messagingSenderId: "560367968750",
  appId: "1:560367968750:web:17081b35a89b825bb6aeff",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const myFirestore = getFirestore(app);
