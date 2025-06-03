import axiosInstance from "../axiosInstance";

interface SearchResponse {
  message: string;
  data: {
    content: [
      {
        seq: string;
        name: string;
        imageList: {
          url: string;
        }[];
      }
    ];
  };
}

interface TrackResponse {
  message: string;
  data: {
    content: [
      {
        spotifyTrackId: string;
        spotifyTrackSeq: string;
        name: string;
        imageList: {
          url: string;
        }[];
        trackArtistNameList: string;
      }
    ];
  };
}

export const trackSearch = (page = 0, size = 10, query = "") => {
  return axiosInstance.get<TrackResponse>("/api/spotify/search/track", {
    params: {
      page,
      size,
      query,
    },
  });
};

export const playlistSearch = (page = 0, size = 10, query = "") => {
  return axiosInstance.get<SearchResponse>("/api/spotify/search/playlist", {
    params: {
      page,
      size,
      query,
    },
  });
};
