import { FC, memo } from "react";
import CheckBox from "../../components/check-box/check-box";
import { useDispatch, useSelector } from "react-redux";
import classes from "./filter-section.module.scss";
import { SIDE_BAR } from "../../constants/app.constants";
import { RootState } from "../../store";
import { changeFilter } from "../../store/blog-list-slice";

interface FilterSectionProps {}

const FilterSection: FC<FilterSectionProps> = ({}) => {
  const filters = useSelector((state: RootState) => state.blogList.filters);
  const isDarkMode = useSelector(
    (state: RootState) => state.sideBar.isDarkMode
  );
  const blogTypes = Object.keys(filters);
  const dispatch = useDispatch();

  function handleChange(blog: string) {
    dispatch(changeFilter(blog));
  }

  const style = `${classes.filterSection} ${
    isDarkMode ? classes.dark : classes.light
  }`;
  return (
    <div className={style}>
      <h1>{SIDE_BAR.FILTER}</h1>
      {blogTypes.map((blog) => (
        <CheckBox
          key={blog}
          label={blog}
          value={filters[blog]}
          handleChange={() => {
            handleChange(blog);
          }}
        />
      ))}
    </div>
  );
};

export default memo(FilterSection);
