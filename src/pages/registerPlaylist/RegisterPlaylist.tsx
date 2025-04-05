import prevIcon from "../../images/chevron-left.svg";
import FinishButton from "../../components/FinishButton";
import { useNavigate } from "react-router-dom";
import sample from "../../images/sample.png";
import RegisterButton from "../../components/RegisterButton";
import Button from "../../components/Button";
export default function RegisterPlaylist() {
  const navigate = useNavigate();

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between md:justify-center md:px-[20%] md:relative">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer md:absolute md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg text-purple-900">
          새 플레이리스트 만들기
        </h1>
        <div className="md:hidden">
          <FinishButton />
        </div>
      </header>
      <main className="w-full min-h-screen bg-[#f5f6ff] p-4 py-7 md:px-[20%]">
        <section className="flex flex-col items-center gap-4">
          <h2 className="sr-only">플레이리스트 등록하기</h2>
          <img src={sample} alt="" className="mb-3 md:w-[150px] md:h-[150px]" />
          <label htmlFor="playlistTitle" className="sr-only">
            플레이리스트 제목
          </label>
          <input
            id="playlistTitle"
            name="playlistTitle"
            type="text"
            placeholder="플레이리스트 제목"
            className="border-b border-b-gray-300 p-2 font-bold w-full focus:outline-none"
          />
          <label htmlFor="playlistInfo" className="sr-only">
            플레이리스트 소개글
          </label>
          <input
            id="playlistInfo"
            name="playlistInfo"
            type="text"
            placeholder="소개글을 입력하세요"
            className="border-b border-b-gray-300 p-2 text-sm w-full focus:outline-none"
          />
        </section>
        <div className="mt-5 flex justify-between items-center">
          <RegisterButton onClick={() => navigate("/search-artist")}>
            곡 추가하기
          </RegisterButton>
          <Button outline>등록하기</Button>
        </div>
      </main>
    </>
  );
}
