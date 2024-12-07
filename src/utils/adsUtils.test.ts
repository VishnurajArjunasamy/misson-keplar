import { getRandomShortAd, getRandomLongAd } from "./adsUtils"; 
import shortAd1 from "../assets/images/small-promos/AdvertisementSmall1.png";
import shortAd2 from "../assets/images/small-promos/AdvertisementSmall2.png";
import longAd1 from "../assets/images/large-promos/adv1.png";
import longAd2 from "../assets/images/large-promos/adv-2.png";


describe("Ad functions", () => {
  describe("getRandomShortAd", () => {
    it("returns a random short ad from the predefined array", () => {
      const result = getRandomShortAd();
      expect([shortAd1, shortAd2]).toContain(result); 
    });
  });

  describe("getRandomLongAd", () => {
    it("returns a random long ad from the predefined array", () => {
      const result = getRandomLongAd();
      expect([longAd1, longAd2]).toContain(result); 
    });
  });
});
