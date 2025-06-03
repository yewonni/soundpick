import axiosInstance from "../axiosInstance";

interface GetProfileResponse {
  data: {
    nickname: string;
    introduction: string;
    imageUrl: string;
  };
}

export const getProfile = () => {
  return axiosInstance.get<GetProfileResponse>("/api/members/me");
};
