import prevIcon from "../../images/chevron-left.svg";
import FinishButton from "../../components/FinishButton";
import { useNavigate } from "react-router-dom";
import sample from "../../images/sample.png";
import RegisterButton from "../../components/RegisterButton";
export default function RegisterPlaylist() {
  const navigate = useNavigate();

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-between">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg">새 플레이리스트 만들기</h1>
        <FinishButton />
      </header>
      <main className="w-full min-h-screen bg-white p-4 py-7">
        <section className="flex flex-col items-center gap-4">
          <h2 className="sr-only">플레이리스트 등록하기</h2>
          <img src={sample} alt="" className="mb-3" />
          <label htmlFor="playlistTitle" className="sr-only">
            플레이리스트 제목
          </label>
          <input
            id="playlistTitle"
            name="playlistTitle"
            type="text"
            placeholder="플레이리스트 제목"
            className="border-b border-b-gray-300 py-2 font-bold w-full focus:outline-none"
          />
          <label htmlFor="playlistInfo" className="sr-only">
            플레이리스트 소개글
          </label>
          <input
            id="playlistInfo"
            name="playlistInfo"
            type="text"
            placeholder="소개글을 입력하세요"
            className="border-b border-b-gray-300 py-2 text-sm w-full focus:outline-none"
          />
        </section>
        <div className="mt-5">
          <RegisterButton onClick={() => navigate("/search-artist")}>
            곡 추가하기
          </RegisterButton>
        </div>
      </main>
    </>
  );
}
