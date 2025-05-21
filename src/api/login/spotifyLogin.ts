import axiosInstance from "../axiosInstance";

interface SpotifyLoginResponse {
  data: string;
}

export const spotifyLogin = () => {
  return axiosInstance.get<SpotifyLoginResponse>("/api/spotify/auth/login");
};
