import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance, {
  injectAccessTokenGetter,
  injectIsLoggedInGetter,
  injectIsInitializingGetter,
  injectHasInitializedGetter,
  injectSetPreferenceAnalyzed,
} from "../api/axiosInstance";
import { encryptWithRSAFromServer } from "../utils/crypto";

interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    nickname: string;
  };
  meta: {
    spotifyLoginRequired: boolean;
    preferenceAnalyzed: boolean;
  };
}

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userNickname: string | null;
  setUserNickname: (status: string | null) => void;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  spotifyLoginRequired: boolean;
  preferenceAnalyzed: boolean;
  setPreferenceAnalyzed: (status: boolean) => void;
  isInitializing: boolean;
  setIsInitializing: (status: boolean) => void;
  hasInitialized: boolean;
  setHasInitialized: (status: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [spotifyLoginRequired, setSpotifyLoginRequired] =
    useState<boolean>(false);
  const [preferenceAnalyzed, setPreferenceAnalyzed] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // axios instance에 상태 getter 함수들 주입
  useEffect(() => {
    injectAccessTokenGetter(() => accessToken);
    injectIsLoggedInGetter(() => isLoggedIn);
    injectIsInitializingGetter(() => isInitializing);
    injectHasInitializedGetter(() => hasInitialized);
    injectSetPreferenceAnalyzed(setPreferenceAnalyzed);
  }, [accessToken, isLoggedIn, isInitializing, hasInitialized]);

  const login = async (userId: string, password: string): Promise<boolean> => {
    const { encrypted, rsaSeq } = await encryptWithRSAFromServer(password);

    if (!encrypted || !rsaSeq) {
      throw new Error("비밀번호 암호화 실패");
    }

    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/api/auth/login",
        {
          userId,
          password: encrypted,
          rsaSeq,
        }
      );

      const {
        accessToken: token,
        userId: responseUserId,
        nickname,
      } = response.data.data;

      const {
        spotifyLoginRequired: needSpotify,
        preferenceAnalyzed: needAnalyzed,
      } = response.data.meta;

      setAccessToken(token);
      setIsLoggedIn(true);
      setUserNickname(nickname);
      setSpotifyLoginRequired(needSpotify);
      setPreferenceAnalyzed(needAnalyzed);

      localStorage.setItem("userId", responseUserId);
      localStorage.setItem("nickname", nickname);

      // 로그인 직후 직접 헤더 설정 (초기 요청 대응용)
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      // 스포티파이 로그인 필요 여부 반환
      return needSpotify;
    } catch (error) {
      console.error("로그인 실패", error);

      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");

      setAccessToken(null);
      setIsLoggedIn(false);
      setUserNickname(null);
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isLoggedIn,
        setIsLoggedIn,
        userNickname,
        setUserNickname,
        login,
        logout,
        spotifyLoginRequired,
        preferenceAnalyzed,
        setPreferenceAnalyzed,
        isInitializing,
        setIsInitializing,
        hasInitialized,
        setHasInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
