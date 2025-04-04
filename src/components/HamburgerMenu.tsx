import { useNavigate } from "react-router-dom";
import closeIcon from "../images/close-btn.svg";
import Button from "./Button";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[280px] bg-[#CACCE9] z-10 
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
      <section className="w-full flex flex-col border-b border-b-purple-500 pb-3">
        <h2 className="sr-only">사용자 섹션</h2>
        <p className="font-semibold text-white text-[20px] mb-3">
          로그인 해주세요
        </p>
        <div className="flex justify-between items-baseline">
          <Button outline size="md" onClick={() => navigate("/login")}>
            로그인
          </Button>
          <button
            className="text-sm text-primary font-bold underline"
            onClick={() => navigate("/join")}
          >
            회원가입
          </button>
        </div>
      </section>
      <section className="mt-4">
        <h2 className="sr-only">메뉴 옵션</h2>
        <nav>
          <ul className="flex flex-col gap-4 font-bold pl-1">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              soundpick 홈
            </li>
            <li>인기 아티스트</li>
            <li>추천 플레이리스트</li>
          </ul>
        </nav>
      </section>
    </div>
  );
}
