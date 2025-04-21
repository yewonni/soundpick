import axiosInstance from "../axiosInstance";

interface DuplicateCheckResponse {
  code: number;
  message: string;
  data: {
    duplicate: boolean;
  };
}

export const checkUserId = (userId: string) => {
  return axiosInstance.get<DuplicateCheckResponse>("/api/members/exists/id", {
    params: { userId },
  });
};

export const checkNickname = (nickname: string) => {
  return axiosInstance.get<DuplicateCheckResponse>(
    "/api/members/exists/nickname",
    {
      params: { nickname },
    }
  );
};
