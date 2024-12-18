import { FC, memo, useEffect } from "react";
import CheckBox from "../../components/check-box/check-box";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, setAvailableFilters } from "../../store/side-bar-slice";
import { StoreIF } from "../../modals/storeModal";

interface FilterSectionProps {}

const blogTypes = ["Regional Blog", "National Blog", "International Blog"];

const FilterSection: FC<FilterSectionProps> = ({}) => {
  const filters = useSelector((state: StoreIF) => state.sideBar.filtersApplied);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvailableFilters(blogTypes));
  }, []);

  function handleChange(blog: string) {
    dispatch(changeFilter(blog));
  }
  return (
    <div>
      <h1>Filter</h1>
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
