import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import { getPosters } from "../../services/restaurantService.ts";
import { Poster } from "../../models/posterModel.ts";
import PosterRender from "../../components/poster/poster.tsx";

const animations: string[] = [
  "bottomRightToCentre",
  "topLeftToCentre",
  "leftToCentre",
  "bottomToCentre",
  "topToCentre",
];

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

  useEffect(() => {
    const autoSliderInterval = setInterval(() => {
      setActivePoster((prev) => {
        if (posters && !(prev === posters.length - 1)) {
          return prev + 1;
        }
        return 0;
      });
    }, 3000);
    return () => clearInterval(autoSliderInterval);
  }, [activePoster, posters]);

  function handleClick(idx: number) {
    setActivePoster(idx);
  }
console.log("Home");

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
            className={`${
              activePoster == idx ? activeStyle : styles[`carousel-btn`]
            }`}
          ></li>
        );
      })}
    </ol>
  );
  return (
    <div className={styles.home}>
      {posters?.map((poster, key) => {
        if (key == activePoster) {
          return (
            <PosterRender
              key={key}
              poster={poster}
              animationType={animations[key]}
            />
          );
        }
      })}
      {carouselStrip}
    </div>
  );
}
