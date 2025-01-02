import { ref, set, get } from "firebase/database";
import { BlogsDatabase } from "./firebase";
import { BlogWithIdIF } from "../modals/blog-list-modal";

export const updateBlogs = async (data: BlogWithIdIF[]) => {
  console.log("Before getting database instance...");
  const db = BlogsDatabase;
  console.log("Database instance retrieved:", db);
  console.log("Before creating reference...");
  const hobbiesRef = ref(db, "/");
  console.log("Reference created:", hobbiesRef);
  console.log("Before setting data...");
  const d = await set(hobbiesRef, data);
  console.log(d);
  const snapshot = await get(hobbiesRef);

  if (snapshot.exists()) {
    const updatedData = snapshot.val();
    console.log("Updated Data:", updatedData);
    return updatedData;
  } else {
    console.log("No data found!");
    return null;
  }
};
