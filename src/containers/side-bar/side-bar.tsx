import { FC, useEffect } from "react";
import CheckBox from "../../components/check-box/check-box";
import { SIDE_BAR } from "../../constants/app.constants";
import classes from "./side-bar.module.scss";
import { changeFilter, setAvailableFilters } from "../../store/side-bar-slice";
import { useDispatch, useSelector } from "react-redux";
import { StoreIF } from "../../modals/storeModal";
import FilterSection from "../filter-section/filter-section";
interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
  const style = `${classes.sideBar} ${classes.light}`;

  return (
    <section className={style}>
      <h1 className={classes.heading}>
        <span>{SIDE_BAR.LITTLE}</span>
        <span>{SIDE_BAR.BOOK}</span>
      </h1>
      <FilterSection />
      <h3>{"View Members"}</h3>
      <h2>{"Switch to Dark Mode"}</h2>
    </section>
  );
};

export default SideBar;
