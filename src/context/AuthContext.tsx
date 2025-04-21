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
  };
}

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: boolean;
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

      const { accessToken } = response.data.data;

      setAccessToken(accessToken);
      setIsLoggedIn(true);
      console.log(isLoggedIn);

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
    setAccessToken(null);
    setIsLoggedIn(false);

    delete axiosInstance.defaults.headers.common["Authorization"];
    await axiosInstance.post("/api/auth/logout");
  };

  return (
    <AuthContext.Provider value={{ accessToken, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
