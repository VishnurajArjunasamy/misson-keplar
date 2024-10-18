import { NOT_FOUND } from "../../constants/app.constant";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <h1>{NOT_FOUND}</h1>
    </div>
  );
}
