import styles from "./movies-container.module.scss";
const MoviesContainer = () => {
  const moviesSection = <></>;
  return (
    <div className={styles["movie-container"]}>
      <section className={styles["movies-section"]}>{moviesSection}</section>
      <section className={styles["info-section"]}></section>
    </div>
  );
};

export default MoviesContainer;
