import banner from "../../assets/images/sindel-background.png";
import LotterySection from "../../components/lottery-section/lottery-section";
import TrailerSection from "../../containers/trailer-section/trailer-section";
import styles from "./home.module.scss";
const Home = () => {
  return (
    <div className={styles["home"]}>
      <section className={styles["banner-section"]}>
        <img src={banner} />
      </section>
      <LotterySection />
      <TrailerSection />
    </div>
  );
};

export default Home;
