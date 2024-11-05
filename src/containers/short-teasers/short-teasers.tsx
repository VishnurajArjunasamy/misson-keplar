import { memo, useEffect, useState } from "react";
import styles from "./short-teasers.module.scss";
import { SHORT_TEASERS } from "../../constants/app-constants";
import { TeaserCard } from "../../components/teaser-card/teaser-card";
import { ShortTeasersIF } from "../../modals/teaserModal";
import { getShortTeasers } from "../../services/getShortTeasers";
import withAdvertisement from "../../helper/withAdvertisement";

const ShortTeasers = () => {
  const [teasers, setTeasers] = useState<ShortTeasersIF[]>([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    async function fetchTeasers() {
      try {
        const response = await getShortTeasers();
        setTeasers(response);
      } catch (e) {
        setErrors(e);
      }
    }

    fetchTeasers();
  }, []);

  if (errors) {
    throw new Error("Error fetching Teasers");
  }

  return (
    <section className={styles["short-teasers"]}>
      <h1>{SHORT_TEASERS.HEADING}</h1>
      <div className={styles["teasers-container"]}>
        {teasers.map((teaser) => (
          <TeaserCard teaserData={teaser} key={teaser.movieName} />
        ))}
      </div>
    </section>
  );
};

export default memo(ShortTeasers);
