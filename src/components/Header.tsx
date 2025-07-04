import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.svg";
import hamburger from "../images/hamburger.svg";
import search from "../images/search.svg";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import { useSearchInput } from "../context/SearchContext";
import LoginModal from "./LoginModal";

interface HeaderProps {
  onClick?: () => void;
}

export default function Header({ onClick }: HeaderProps) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { inputValue, setInputValue } = useSearchInput();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
      return;
    }

    if (!inputValue.trim()) return;

    navigate(`/search-result?q=${encodeURIComponent(inputValue)}`);
  };

  const handleClose = () => {
    setIsOpenLoginModal(false);
  };

  const handleMobileSearchClick = () => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
      return;
    }
    navigate("/search");
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 py-8 h-[70px] md:px-[10%] md:py-[50px] md:justify-start md:gap-7">
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
            className="w-[130px] h-[60px] md:w-[180px] md:h-[150px] cursor-pointer"
          />
        </h1>
        <button className="md:hidden">
          <img
            src={search}
            alt="검색하기"
            className="cursor-pointer"
            onClick={handleMobileSearchClick}
          />
        </button>
        <div className="hidden md:block w-[240px] min-w-[200px] flex-grow mx-4 overflow-hidden">
          <SearchBar
            onSubmit={handleSearch}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="음악, 플레이리스트명으로 검색"
          />
        </div>
        <div className="hidden md:flex flex-wrap gap-2 justify-end items-center text-white whitespace-nowrap text-lg">
          {isLoggedIn ? (
            <>
              <button
                className="min-w-[90px] whitespace-nowrap hover:text-text-hover hover:underline active:text-text-subtle font-bold"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Log Out
              </button>

              <button
                className="min-w-[90px] whitespace-nowrap hover:text-text-hover hover:underline active:text-text-subtle font-bold"
                onClick={() => navigate("/mypage")}
              >
                My Page
              </button>
            </>
          ) : (
            <>
              <button
                className="min-w-[90px] whitespace-nowrap hover:text-text-hover hover:underline active:text-text-subtle font-bold"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="min-w-[90px] whitespace-nowrap hover:text-text-hover hover:underline active:text-text-subtle font-bold"
                onClick={() => navigate("/join")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>
      <LoginModal isOpen={isOpenLoginModal} onClose={handleClose} />
    </>
  );
}
