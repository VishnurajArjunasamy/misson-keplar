import axios from "axios";
import { MEMBERS_URL } from "../constants/url.constants";
import { MembersIF } from "../modals/members-modal";

/**
 *@returns Array of Users of type MemebersIF
 */

export async function getMemebers() {
  const response = await axios.get<MembersIF[]>(`${MEMBERS_URL}/.json`);
  return response.data;
}
