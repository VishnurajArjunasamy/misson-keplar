import shortAd1 from "../assets/images/small-promos/AdvertisementSmall1.png";
import shortAd2 from "../assets/images/small-promos/AdvertisementSmall2.png";

const getRandomAd = (ads: string[]) => {
  return ads[Math.floor(Math.random() * ads.length)];
};

export const getRandomShortAd = () => {
  const smallAds = [shortAd1, shortAd2];
  return getRandomAd(smallAds);
};
