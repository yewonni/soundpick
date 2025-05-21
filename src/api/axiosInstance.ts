import axios from "axios";

let setLoadingGlobal: ((value: boolean) => void) | null = null;

export const injectSetLoading = (fn: (value: boolean) => void) => {
  setLoadingGlobal = fn;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// accessToken getter 함수 주입용
let getAccessToken: (() => string | null) | null = null;

export const injectAccessTokenGetter = (fn: () => string | null) => {
  getAccessToken = fn;
};

// 요청 시 accessToken을 헤더에 자동으로 추가
axiosInstance.interceptors.request.use((config) => {
  // 로딩 시작 - setLoadingGlobal이 주입되어 있을 때만 실행
  if (setLoadingGlobal) {
    setLoadingGlobal(true);
  }
  const skipAuthUrls = [
    "/api/spotify/auth/login",
    "/api/auth/login",
    "/api/auth/refresh",
    "/api/auth/logout",
    "/api/members/exists/id",
    "/api/members/exists/nickname",
    "/api/members/sign-up",
    "/api/security/public-key",
    "/api/spotify/artist/popular-list",
  ];

  // 요청 URL이 skip 리스트에 포함되어 있다면 토큰 추가 X
  const isSkipAuth = skipAuthUrls.some((url) => config.url?.startsWith(url));

  if (!isSkipAuth) {
    const token = getAccessToken?.();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let _setAccessToken: ((token: string) => void) | null = null;

export const injectSetAccessToken = (fn: (token: string) => void) => {
  _setAccessToken = fn;
};

export interface RefreshResponse {
  data: {
    refreshToken: string;
    accessToken: string;
  };
  meta: {
    preferenceAnalyzed: boolean;
  };
}

interface PreferenceResponse {
  meta: {
    preferenceAnalyzed: boolean;
  };
}

let setPreferenceAnalyzedGlobal: ((value: boolean) => void) | null = null;

export const injectSetPreferenceAnalyzed = (fn: (value: boolean) => void) => {
  setPreferenceAnalyzedGlobal = fn;
};

axiosInstance.interceptors.response.use(
  (response) => {
    // 성공 응답 시 로딩 종료
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }
    const data = response.data as PreferenceResponse;

    if (
      data &&
      data.meta &&
      typeof data.meta.preferenceAnalyzed === "boolean" &&
      setPreferenceAnalyzedGlobal
    ) {
      setPreferenceAnalyzedGlobal(data.meta.preferenceAnalyzed);
    }

    return response;
  },
  async (error) => {
    // 에러 응답 시에도 로딩 종료
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<RefreshResponse>(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.refreshToken;

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        if (_setAccessToken) {
          _setAccessToken(newAccessToken);
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
