import { ShortTeasersIF, TeaserWithIDIF } from "../modals/teaserModal";

const teaser_ids = ["teaser_1", "teaser_2", "teaser_3"];

export const addIdToTeasers = (teasers: ShortTeasersIF[]) => {
  return teasers.map(
    (teaser, idx): TeaserWithIDIF => ({ ...teaser, id: teaser_ids[idx] })
  );
};
