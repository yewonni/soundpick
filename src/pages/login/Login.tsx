import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validations/loginSchema";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSaveIdChecked, setIsSaveIdChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedId = localStorage.getItem("savedUserId");
    if (savedId) {
      setUserId(savedId);
      setIsSaveIdChecked(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ userId, password });

    if (!result.success) {
      const message = result.error.errors[0].message;
      setErrorMessage(message);
      return;
    }

    setErrorMessage("");

    try {
      const spotifyRequired = await login(userId, password);

      if (isSaveIdChecked) {
        localStorage.setItem("savedUserId", userId);
      } else {
        localStorage.removeItem("savedUserId");
      }

      navigate("/", { state: { spotifyLoginRequired: spotifyRequired } });
    } catch (error) {
      console.error("로그인 실패", error);

      if (error instanceof Error && (error as any).response?.data?.message) {
        setErrorMessage((error as any).response.data.message);
      } else {
        setErrorMessage("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="w-[230px] cursor-pointer md:w-[300px] "
            onClick={() => navigate("/")}
          />
        </h1>
        <article className="mt-4">
          <h2 className="sr-only">로그인</h2>
          <form
            onSubmit={handleLogin}
            className=" text-text-base w-[295px] min-h-[210px] max-h-[350px] md:w-[450px] md:min-h-[300px]  p-[25px] md:p-[40px] flex flex-col gap-3 md:gap-4"
          >
            <div className="flex flex-col gap-3 md:gap-6 items-start text-sm mt-2 md:text-base md:mt-4">
              <label htmlFor="userId" className="sr-only ">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border-b border-b-text-base placeholder-text-base w-full py-2 focus:outline-none bg-transparent focus:bg-transparent"
              />
              <label htmlFor="pw" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="pw"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b border-b-text-base placeholder-text-base w-full py-2 focus:outline-none bg-transparent focus:bg-transparent"
              />
              {errorMessage && (
                <p className="text-xs text-text-subtle md:text-sm">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex gap-1 justify-end items-center mb-1">
              <Checkbox
                type="circle"
                checked={isSaveIdChecked}
                onChange={setIsSaveIdChecked}
              />
              <p className="text-xs md:text-sm">아이디 저장</p>
            </div>
            <Button default size="full">
              로그인
            </Button>
            <p className="text-[#333] text-xs font-bold md:text-sm">
              ※ 본 서비스는 Spotify 계정 연동이 필수입니다.
            </p>
          </form>
          <div className="flex gap-2 items-center justify-center mt-3 md:mt-4 text-xs md:text-sm text-text-base">
            <p
              className="cursor-pointer  hover:text-text-hover hover:underline active:font-semibold"
              onClick={() => navigate("/join")}
            >
              회원가입
            </p>
            <span className="w-px h-3  bg-text-base"></span>
            <p className="hover:text-text-hover cursor-pointer">
              비밀번호 찾기
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
