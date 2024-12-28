import axios from "axios";
import { getDatabase, ref, set, update } from "firebase/database";
import { BlogsDatabase } from "./firebase";
import { NewBlogIF } from "../modals/new-blog-modal";
import { BlogWithIdIF } from "../modals/blog-list-modal";

export const postNewBlog = async (data: BlogWithIdIF[]) => {
  console.log("Before getting database instance...");
  const db = BlogsDatabase;
  console.log("Database instance retrieved:", db);
  console.log("Before creating reference...");
  const hobbiesRef = ref(db, "/");
  console.log("Reference created:", hobbiesRef);
  console.log("Before setting data...");
  const d = await set(hobbiesRef, data);
  console.log(d);
};
