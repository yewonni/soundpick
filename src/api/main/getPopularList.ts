import axiosInstance from "../axiosInstance";

interface PopularPlayListResponse {
  data: {
    content: [
      {
        spotifyPlaylistSeq: string;
        name: string;
        description: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

export const getPopularPlayList = (page = 0, size = 10) => {
  return axiosInstance.get<PopularPlayListResponse>(
    "/api/spotify/playlist/popular-list",
    {
      params: {
        page,
        size,
      },
    }
  );
};
