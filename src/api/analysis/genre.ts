import axiosInstance from "../axiosInstance";

interface genreResponse {
  code: number;
  message: string;
  data: {
    content: [
      {
        seq: number;
        name: string;
      }
    ];
  };
}

export const getGenre = (page = 0, size = 10) => {
  return axiosInstance.get<genreResponse>("/api/spotify/genre/list", {
    params: {
      page,
      size,
    },
  });
};
