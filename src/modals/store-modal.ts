import { BlogListState } from "./blog-list-modal";
import { SideBarState } from "./sidebar-modal";

export interface StoreIF {
  sideBar: SideBarState;
  blogList: BlogListState;
}
