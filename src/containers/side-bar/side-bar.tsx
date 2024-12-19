import { FC } from "react";
import { SIDE_BAR } from "../../constants/app.constants";
import classes from "./side-bar.module.scss";
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
      <div className={classes.actions}>
        <h3>{"View Members"}</h3>
        <h2>{"Switch to Dark Mode"}</h2>
      </div>
    </section>
  );
};

export default SideBar;
