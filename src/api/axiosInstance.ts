import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

let _setAccessToken: ((token: string) => void) | null = null;

export const injectSetAccessToken = (fn: (token: string) => void) => {
  _setAccessToken = fn;
};

export interface RefreshResponse {
  refreshToken: string;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<RefreshResponse>(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.refreshToken;

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        if (_setAccessToken) {
          _setAccessToken(newAccessToken); // 여기서 AuthContext의 accessToken 업데이트
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        // 여기서 로그아웃을 트리거할 수도 있음
        window.location.href = "/login"; // 또는 로그아웃 함수 호출
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
