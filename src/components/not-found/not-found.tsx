import styles from "./not-found.module.scss";
import img from "../../assets/images/lost.jpg";
import { NOT_FOUND } from "../../constants/app.constants";
const NotFound = () => {
  console.log(styles);

  return (
    <div className={styles.notFound}>
      <h1>{NOT_FOUND.LOST_TXT}</h1>
    </div>
  );
};

export default NotFound;
