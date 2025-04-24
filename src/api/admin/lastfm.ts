import axiosInstance from "../axiosInstance";

interface getLastFmResponse {
  data: string;
}

export const getLastFm = () => {
  return axiosInstance.get<getLastFmResponse>("/api/lastfm/login");
};
