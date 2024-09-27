import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/navbar.tsx";
import styles from "./home.module.scss";
import { getPosters } from "../../services/restaurant.ts";
import { Poster } from "../../types/restaurant.ts";
import PosterRender from "../../components/poster/poster.tsx";

export default function Home() {
  const [posters, setPosters] = useState<undefined | Poster[]>(undefined);
  const [activePoster, setActivePoster] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getPosters();
      setPosters(result);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   const autoSliderInterval = setInterval(() => {
  //     setActivePoster((prev) => prev + 1);
  //   }, 3000);
  //   return () => clearInterval(autoSliderInterval);
  // }, []);

  function handleClick(idx: number) {
    setActivePoster(idx);
  }

  const activeStyle = `${styles[`carousel-btn`]} ${styles[`active`]}`;
  const carouselStrip = (
    <ol className={styles["carousel-strip"]}>
      {posters?.map((poster, idx) => {
        return (
          <li
            key={idx}
            onClick={() => {
              handleClick(idx);
            }}
            className={
              `${activePoster == idx ? activeStyle : styles[`carousel-btn`]}`
              //  `${styles[`carousel-btn`]} ${styles[`active`]}`
              //  styles[`carousel-btn`]
            }
          ></li>
        );
      })}
    </ol>
  );
  return (
    <div className={styles.home}>
      {/* {<NavBar />} */}
      {posters?.map((poster, key) => {
        if (key == activePoster) {
          return <PosterRender key={key} poster={poster} />;
        }
      })}
      {carouselStrip}
    </div>
  );
}
