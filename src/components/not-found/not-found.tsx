import styles from "./not-found.module.scss";
import img from "../../assets/images/lost.jpg";
const NotFound = () => {
  console.log(styles);

  return (
    <div className={styles.notFound}>
      <img src={img} />
    </div>
  );
};

export default NotFound;
