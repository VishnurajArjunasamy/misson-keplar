import { BlogListState } from "./blog-list-modal";
import { SideBarState } from "./sideBarModal";

export interface StoreIF {
  sideBar: SideBarState;
  blogList: BlogListState;
}
