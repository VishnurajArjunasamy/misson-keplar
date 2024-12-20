import { FC } from "react";
import { SIDE_BAR } from "../../constants/app.constants";
import classes from "./side-bar.module.scss";
import FilterSection from "../filter-section/filter-section";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, toggleShowMembers } from "../../store/side-bar-slice";
import Modal from "../../components/modal/modal";
import MemebersSection from "../members-section/memebers-section";
import { AppDispatch, RootState } from "../../store";
interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
  const showMembers = useSelector(
    (state: RootState) => state.sideBar.showMembers
  );
  const isDarkMode = useSelector(
    (state: RootState) => state.sideBar.isDarkMode
  );
  const dispatch = useDispatch<AppDispatch>();

  function handleViewMemebers() {
    dispatch(toggleShowMembers());
  }
  function handleDarkMode() {
    dispatch(toggleDarkMode());
  }

  const style = `${classes.sideBar} ${
    isDarkMode ? classes.dark : classes.light
  }`;

  return (
    <section className={style}>
      <h1 className={classes.heading}>
        <span>{SIDE_BAR.LITTLE}</span>
        <span>{SIDE_BAR.BOOK}</span>
      </h1>
      <FilterSection />
      <div className={classes.actions}>
        <h2 onClick={handleViewMemebers}>{SIDE_BAR.VIEW_MEMBERS}</h2>
        <h2 onClick={handleDarkMode}>{SIDE_BAR.SWITCH_DARK}</h2>
      </div>
      {showMembers && (
        <div className={classes.members}>
          <Modal>
            <MemebersSection />
          </Modal>
        </div>
      )}
    </section>
  );
};

export default SideBar;
