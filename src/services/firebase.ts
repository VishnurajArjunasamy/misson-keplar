import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfigBlogs = {
  apiKey: "AIzaSyCwS5OZ8emU8qbKly9ikEqgHZri7xkmenU",
  authDomain: "littlebook-60555.firebaseapp.com",
  databaseURL: "https://littlebook-60555-default-rtdb.firebaseio.com",
  projectId: "littlebook-60555",
  storageBucket: "littlebook-60555.firebasestorage.app",
  messagingSenderId: "376505316957",
  appId: "1:376505316957:web:f3932343ff66a4dd18bfb4",
  measurementId: "G-B08LHSYFD7"
};
export const BlogsApp = initializeApp(firebaseConfigBlogs);
export const BlogsDatabase = getDatabase(BlogsApp);
