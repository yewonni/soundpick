export interface Item {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyTrackId?: string;
}

export interface TrackStateItem {
  name: string;
  imageList: { url: string }[];
  trackArtists: { name: string }[];
  recommendTrackSeq?: string; // 기존 추천 항목
  spotifyTrackSeq?: string; // 새로 추가된 항목
  spotifyTrackId?: string;
}

export interface DeletedTrackItem {
  recommendTrackSeq: string;
}

export interface DeletedArtistItem {
  recommendArtistSeq: string;
}

export interface ArtistStateItem {
  name: string;
  imageList: { url: string }[];
  recommendArtistSeq?: string;
  spotifyArtistSeq?: string;
}
