import { useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import hamburger from "../images/hamburger.svg";
import search from "../images/search.svg";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onClick?: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-4 py-2 h-[70px] md:px-[9%] md:py-[50px] md:justify-start md:gap-1">
      <button className="md:hidden">
        <img
          src={hamburger}
          alt="메뉴열기"
          className="cursor-pointer"
          onClick={onClick}
        />
      </button>
      <h1>
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="md:w-[250px] md:h-[150px] cursor-pointer"
        />
      </h1>
      <button className="md:hidden">
        <img
          src={search}
          alt="검색하기"
          className="cursor-pointer"
          onClick={() => navigate("/search")}
        />
      </button>
      <div className="hidden md:block w-[320px]">
        <SearchBar placeholder="아티스트, 음악, 플레이리스트 검색하기" />
      </div>
      <div className="hidden md:flex gap-6 text-lg text-[#333] ml-[38%]">
        <button
          className="hover:text-primary active:text-purple-800 font-bold"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
        <button
          className="hover:text-primary active:text-purple-800 font-bold"
          onClick={() => navigate("/join")}
        >
          회원가입
        </button>
      </div>
    </header>
  );
}
