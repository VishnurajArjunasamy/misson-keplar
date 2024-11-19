import shortAd1 from "../assets/images/small-promos/AdvertisementSmall1.png";
import shortAd2 from "../assets/images/small-promos/AdvertisementSmall2.png";
import longAd1 from "../assets/images/large-promos/adv1.png";
import longAd2 from "../assets/images/large-promos/adv-2.png";

const getRandomAd = (ads: string[]) => {
  return ads[Math.floor(Math.random() * ads.length)];
};

export const getRandomShortAd = () => {
  const smallAds = [shortAd1, shortAd2];
  return getRandomAd(smallAds);
};

export const getRandomLongAd = () => {
  const longAds = [longAd1, longAd2];
  return getRandomAd(longAds);
};
