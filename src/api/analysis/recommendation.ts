import axiosInstance from "../axiosInstance";

interface TrackRecommendationsResponse {
  data: {
    content: [
      {
        spotifyTrackSeq: string;
        name: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

interface PlaylistRecommendationsResponse {
  data: {
    content: [
      {
        spotifyPlaylistSeq: string;
        name: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

export const getTrackRecommendations = () => {
  return axiosInstance.get<TrackRecommendationsResponse>(
    "/api/spotify/recommendation/track"
  );
};

export const getPlaylistRecommendations = () => {
  return axiosInstance.get<PlaylistRecommendationsResponse>(
    "/api/spotify/recommendation/playlist"
  );
};
