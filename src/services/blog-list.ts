import axios from "axios";
import { BASE_URL, BLOGS } from "../constants/url.constants";
import { BlogIF, BlogWithIdIF } from "../modals/blog-list-modal";
import { addUUID } from "../utils/addUUID";

/**
 * 
 * @returns Array of Blogs of type BlogIF 
 * title: string;
  details: string;
  photo: string;
  type: string;
 */
export const fetchBlogList = async () => {
  // const response = await axios.get<BlogIF[]>(`${BASE_URL}/${BLOGS}`);
  const response = await axios.get<BlogIF[]>(
    `https://littlebook-60555-default-rtdb.firebaseio.com/.${"json"}`
  );

  return addUUID(response.data) as BlogWithIdIF[];
};
