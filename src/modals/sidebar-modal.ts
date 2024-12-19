import { MembersIF } from "./members-modal";

export interface SideBarState {
  showMembers: boolean;
  isDarkMode: boolean;
  members: MembersIF[] | null;
  loading: boolean;
  error: string | null;
}
