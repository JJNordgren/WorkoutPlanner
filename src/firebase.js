import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  set,
  update,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjgtGH8AIjF59Q6ZKenwLElGkY1WRowSU",
  authDomain: "web3350workoutproject.firebaseapp.com",
  databaseURL: "https://web3350workoutproject-default-rtdb.firebaseio.com",
  projectId: "web3350workoutproject",

  messagingSenderId: "227420482128",
  appId: "1:227420482128:web:19b42952da3604c68cff55",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export { ref, push, get, child, set, update, remove };
