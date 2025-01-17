import { FC, useState } from "react";
import classes from "./modal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface modalProps {
  closeModal?: () => void;
  children: React.ReactNode;
}

const modal: FC<modalProps> = ({ children, closeModal }) => {
  const [isClosing, setIsClosing] = useState(false);

  const isDark = useSelector((state: RootState) => state.sideBar.isDarkMode);

  function handleModalClose() {
    setIsClosing(true);
    setTimeout(() => {
      closeModal && closeModal();
    }, 500);
  }

  const style = `${classes.modal} ${isDark ? classes.dark : classes.light}`;

  const slider = isClosing ? classes.slideOut : classes.slideIn;

  return (
    <div className={style} onClick={handleModalClose}>
      <div
        className={`${classes.content} ${slider} `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default modal;
