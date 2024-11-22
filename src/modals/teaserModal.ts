export interface ShortTeasersIF {
  posterImg: string;
  movieName: string;
  videoUrl: string;
}

export interface TeaserWithIDIF extends ShortTeasersIF {
  id: string;
}

export interface NowPlayingIF {
  teaser_1: boolean;
  teaser_2: boolean;
  teaser_3: boolean;
}
