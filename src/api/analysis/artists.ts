import axiosInstance from "../axiosInstance";

interface ArtistsResponse {
  message: string;
  data: {
    content: {
      spotifyArtistId: string;
      seq: string;
      subject: string;
      name: string;
      imageList: {
        url: string;
      }[];
    }[];
  };
}

export const getArtists = (
  subject: "global" | "korea",
  page = 0,
  size = 10
) => {
  return axiosInstance.get<ArtistsResponse>(
    "/api/spotify/artist/popular-list",
    {
      params: {
        page,
        size,
        subject,
      },
    }
  );
};
