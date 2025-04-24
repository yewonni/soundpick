import { createContext, useContext, useState, ReactNode } from "react";
import axiosInstance from "../api/axiosInstance";
import { encryptWithRSAFromServer } from "../utils/crypto";

// 응답 타입 지정
interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string; // 추가: userId 타입 지정
    nickname: string; // 추가: nickname 타입 지정
  };
}

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void; //
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async (userId: string, password: string) => {
    const { encrypted, rsaSeq } = await encryptWithRSAFromServer(password);

    if (!encrypted || !rsaSeq) {
      alert("비밀번호 암호화 실패");
      return;
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

      // 구조 분해 할당 시 타입을 명확히 지정
      const {
        accessToken,
        userId: responseUserId,
        nickname,
      } = response.data.data;

      setAccessToken(accessToken);
      setIsLoggedIn(true);

      // 로컬 스토리지에 userId와 nickname 저장
      localStorage.setItem("userId", responseUserId);
      localStorage.setItem("nickname", nickname);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout"); // 서버에서 refreshToken 쿠키 삭제

      setAccessToken(null);
      setIsLoggedIn(false);
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
        login,
        logout,
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
