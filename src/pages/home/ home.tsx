import banner from "../../assets/images/sindel-background.png";
import LotterySection from "../../components/lottery-section/lottery-section";
import OtherLanguages from "../../containers/other-languages/other-languages";
import ShortTeasers from "../../containers/short-teasers/short-teasers";
import TrailerSection from "../../containers/trailer-section/trailer-section";
import styles from "./home.module.scss";
const Home = () => {
  return (
    <div className={styles["home"]}>
      <div className={styles["banner-wrapper"]}>
        <section className={styles["banner-section"]}>
          <img src={banner} />
        </section>
        <LotterySection />
      </div>
      <TrailerSection />
      <ShortTeasers />
      <OtherLanguages />
    </div>
  );
};

export default Home;
