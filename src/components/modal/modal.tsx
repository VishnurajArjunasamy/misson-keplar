import { FC } from "react";
import classes from "./modal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface modalProps {
  closeModal?: () => void;
  children: React.ReactNode;
}

const modal: FC<modalProps> = ({ children, closeModal }) => {
  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);
  function handleModalClose() {
    closeModal && closeModal();
  }

  const style = `${classes.modal} ${isDark ? classes.dark : classes.light}`;

  return (
    <div className={style} onClick={handleModalClose}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default modal;
