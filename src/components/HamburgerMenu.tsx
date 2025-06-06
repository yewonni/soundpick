import { useNavigate, useLocation } from "react-router-dom";
import closeIcon from "../images/close-btn.svg";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, userNickname, preferenceAnalyzed } = useAuth();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[280px] bg-[#a8a29e] z-30 
          transform transition-transform duration-300 p-4 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
    >
      <button>
        <img
          src={closeIcon}
          alt=""
          className="relative top-1 left-[220px]"
          onClick={onClose}
        />
      </button>
      <section className="w-full flex flex-col border-b border-b-text-base pb-3">
        <h2 className="sr-only">사용자 섹션</h2>
        <p className="font-semibold text-bg-peach text-[20px] mb-3">
          {isLoggedIn ? `${userNickname}님, 환영합니다!` : "로그인 해주세요"}
        </p>
        <div className="flex justify-between items-baseline">
          {isLoggedIn ? (
            <Button
              outline
              size="sm"
              onClick={() => {
                if (location.pathname !== "/mypage") {
                  navigate("/mypage");
                }
                onClose?.();
              }}
            >
              마이페이지
            </Button>
          ) : (
            <Button primary size="sm" onClick={() => navigate("/login")}>
              로그인
            </Button>
          )}

          {isLoggedIn ? (
            <button
              className="text-sm text-[#333] font-semibold underline"
              onClick={() => {
                logout();
                onClose?.();
                navigate("/");
              }}
            >
              로그아웃
            </button>
          ) : (
            <button
              className="text-xs text-secondary font-semibold underline"
              onClick={() => navigate("/join")}
            >
              회원가입
            </button>
          )}
        </div>
      </section>
      <section className="mt-4">
        <h2 className="sr-only">메뉴 옵션</h2>
        <nav>
          <ul className="flex flex-col gap-4 font-bold pl-1 text-text-base">
            <li
              onClick={() => {
                onClose?.();
                navigate("/");
              }}
              className="cursor-pointer"
            >
              soundpick 홈
            </li>
            <li
              onClick={() => {
                onClose?.();
                if (isLoggedIn && preferenceAnalyzed) {
                  navigate("/recommended-tracks");
                } else {
                  navigate("/popular-artists");
                }
              }}
              className="cursor-pointer"
            >
              {isLoggedIn && preferenceAnalyzed
                ? "취향 저격 음악"
                : "인기 아티스트"}
            </li>
            <li
              onClick={() => {
                onClose?.();
                if (isLoggedIn && preferenceAnalyzed) {
                  navigate("/recommended-playlists");
                } else {
                  navigate("/popular-playlists");
                }
              }}
              className="cursor-pointer"
            >
              {isLoggedIn && preferenceAnalyzed
                ? "맞춤 플리"
                : "추천 플레이리스트"}
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
