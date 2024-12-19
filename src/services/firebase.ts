import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'https://little-book-33934-default-rtdb.firebaseio.com/',
  authDomain: "*****",
  databaseURL: "*****",
  projectId: "little-book-33934",

};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);