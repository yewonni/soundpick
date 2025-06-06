import axios, { AxiosHeaders } from "axios";

// 전역 상태 관리
let setLoadingGlobal: ((value: boolean) => void) | null = null;
let getAccessToken: (() => string | null) | null = null;
let getIsLoggedIn: (() => boolean) | null = null;
let getIsInitializing: (() => boolean) | null = null;
let getHasInitialized: (() => boolean) | null = null;
let _setAccessToken: ((token: string) => void) | null = null;
let setPreferenceAnalyzedGlobal: ((value: boolean) => void) | null = null;

// 토큰 갱신 상태
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// 대기 중인 요청들을 위한 큐
let pendingRequests: Array<{
  config: any;
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// 함수 주입
export const injectSetLoading = (fn: (value: boolean) => void) => {
  setLoadingGlobal = fn;
};

export const injectAccessTokenGetter = (fn: () => string | null) => {
  getAccessToken = fn;
};

export const injectIsLoggedInGetter = (fn: () => boolean) => {
  getIsLoggedIn = fn;
};

export const injectIsInitializingGetter = (fn: () => boolean) => {
  getIsInitializing = fn;
};

export const injectHasInitializedGetter = (fn: () => boolean) => {
  getHasInitialized = fn;
};

export const injectSetAccessToken = (fn: (token: string) => void) => {
  _setAccessToken = fn;
};

export const injectSetPreferenceAnalyzed = (fn: (value: boolean) => void) => {
  setPreferenceAnalyzedGlobal = fn;
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// 대기 중인 요청들 처리
const processPendingRequests = () => {
  const requests = [...pendingRequests];
  pendingRequests = [];

  requests.forEach(({ config, resolve, reject }) => {
    axiosInstance(config).then(resolve).catch(reject);
  });
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosHeaders;
  }

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
    "/api/spotify/playlist/popular-list",
  ];

  const isSkipAuth = skipAuthUrls.some((url) => config.url?.startsWith(url));

  if (isSkipAuth) {
    return config;
  }

  const isInitializing = getIsInitializing?.();
  const hasInitialized = getHasInitialized?.();
  const isLoggedIn = getIsLoggedIn?.();

  // 아직 초기화가 완료되지 않았다면 요청을 대기열에 추가
  if (isInitializing || !hasInitialized) {
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }

    return new Promise((resolve) => {
      const checkAndRetry = () => {
        const currentIsInitializing = getIsInitializing?.();
        const currentHasInitialized = getHasInitialized?.();

        if ((!currentIsInitializing && currentHasInitialized) || isLoggedIn) {
          resolve(config); // 바로 config를 반환 (axiosInstance 호출 아님)
        } else {
          setTimeout(checkAndRetry, 100);
        }
      };

      setTimeout(checkAndRetry, 100);
    });
  }

  if (!isLoggedIn) {
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }

    window.location.href = "/login";
    return Promise.reject(new Error("로그인이 필요합니다"));
  }

  // 토큰 추가
  const token = getAccessToken?.();
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
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
    if (setLoadingGlobal) {
      setLoadingGlobal(false);
    }

    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            (originalRequest.headers as AxiosHeaders).set(
              "Authorization",
              `Bearer ${token}`
            );
            return axiosInstance(originalRequest);
          })

          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post<RefreshResponse>(
              `${process.env.REACT_APP_API_BASE_URL}/api/auth/refresh`,
              {},
              { withCredentials: true }
            )
            .finally(() => {
              refreshPromise = null;
            });
        }

        const res = await refreshPromise;
        const newAccessToken = res.data.data.accessToken;

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        if (_setAccessToken) {
          _setAccessToken(newAccessToken);
        }

        processQueue(null, newAccessToken);
        if (
          originalRequest.headers &&
          typeof (originalRequest.headers as AxiosHeaders).set === "function"
        ) {
          (originalRequest.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${newAccessToken}`
          );
        } else {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (window.location.pathname !== "/") {
          processQueue(refreshError, null);
          console.error("토큰 갱신 실패", refreshError);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export interface RefreshResponse {
  data: {
    refreshToken: string;
    accessToken: string;
    nickname: string;
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

export default axiosInstance;
