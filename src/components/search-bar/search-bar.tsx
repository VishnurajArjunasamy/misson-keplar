import { FC } from "react";
import classes from "./search-bar.module.scss";
import Input from "../input/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSearchQuery } from "../../store/blog-list-slice";
import { BLOG_LIST } from "../../constants/app.constants";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  const searchQuery = useSelector(
    (state: RootState) => state.blogList.searchQuery
  );
  const dispatch = useDispatch();

  const style = `${classes.searchBar} ${isDark ? classes.dark : classes.light}`;

  function handleSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
  }
  return (
    <div className={style}>
      <Input
        type="text"
        value={searchQuery}
        placeholder={BLOG_LIST.SEARCH_TXT}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSearchQuery(e);
        }}
      />
    </div>
  );
};

export default SearchBar;
