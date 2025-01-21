import { memo, useEffect, useMemo, useState } from "react";
import styles from "./short-teasers.module.scss";
import { SHORT_TEASERS } from "../../constants/app-constants";
import { TeaserCard } from "../../components/teaser-card/teaser-card";
import { NowPlayingIF, TeaserWithIDIF } from "../../modals/teaserModal";
import { getShortTeasers } from "../../services/getShortTeasers/getShortTeasers";
import { addIdToTeasers } from "../../utils/addIdToTeasers";

const ShortTeasers = () => {
  const [teasers, setTeasers] = useState<TeaserWithIDIF[]>([]);
  const [errors, setErrors] = useState<Error>();
  const [nowPlaying, setNowPlaying] = useState<NowPlayingIF>({
    teaser_1: false,
    teaser_2: false,
    teaser_3: false,
  });

  useEffect(() => {
    async function fetchTeasers() {
      try {
        const response = await getShortTeasers();
        setTeasers(addIdToTeasers(response));
      } catch (e: unknown) {
        if (e instanceof Error) setErrors(e);
      }
    }

    fetchTeasers();
  }, []);

  // const memoizedTeaser = useMemo(() => teasers, [teasers]) as TeaserWithIDIF[];
  const memoizedTeaser = teasers;

  if (errors) {
    throw new Error("Error fetching Teasers");
  }

  const teaserContainer = (
    <div className={styles["teasers-container"]}>
      {memoizedTeaser.map((teaser) => (
        <TeaserCard
          teaserData={teaser}
          key={teaser.id}
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
        />
      ))}
    </div>
  );

  return (
    <section className={styles["short-teasers"]}>
      <h1>{SHORT_TEASERS.HEADING}</h1>
      {teaserContainer}
    </section>
  );
};

export default memo(ShortTeasers);
