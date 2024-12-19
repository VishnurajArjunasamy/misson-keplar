import { FC } from "react";
import classes from './modal.module.scss'

interface modalProps {
  children: React.ReactNode;
}

const modal: FC<modalProps> = ({ children }) => {
  return <div className={classes.modal}>{children}</div>;
};

export default modal;
