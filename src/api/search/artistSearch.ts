import axiosInstance from "../axiosInstance";

interface ArtistsResponse {
  message: string;
  data: {
    content: [
      {
        name: string;
        imageList: {
          url: string;
        }[];
      }
    ];
  };
}

export const artistSearch = (page = 0, size = 10, query = "") => {
  return axiosInstance.get<ArtistsResponse>("/api/spotify/search/artist", {
    params: {
      page,
      size,
      query,
    },
  });
};
