import axios from "axios";
import { BASE_URL, MEMBERS_URL, USERS } from "../constants/url.constants";
import { MembersIF } from "../modals/members-modal";

/**
 *@returns Array of Users of type MemebersIF
 */

export async function getMemebers() {
  const response = await axios.get<MembersIF[]>(MEMBERS_URL);
  return response.data;
}
