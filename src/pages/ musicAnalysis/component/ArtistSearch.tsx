import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import backIcon from "../../../images/chevron-left.svg";
import FinishButton from "../../../components/FinishButton";
import SearchBar from "../../../components/SearchBar";
import sample from "../../../images/sample.png";
import plus from "../../../images/plus-icon.svg";
import check from "../../../images/check-on.svg";
import Button from "../../../components/Button";

const topArtistList: string[] = [
  "The Weekend",
  "Ariana Grande",
  "Billie Eilish",
  "Ed Sheeran",
  "Taylor Swift",
  "Charlie Puth",
  "Drake",
  "Kendrick Lamar",
  // "LANY",
  // "Anne-Marie",
];

export default function ArtistSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<boolean[]>(
    Array(topArtistList.length).fill(false)
  );

  const toggleSelect = (index: number) => {
    setSelected((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleBack = () => {
    if (location.state?.fromStep2) {
      navigate("/music-analysis", { state: { currentStep: 2 } });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header className="bg-bg-sub px-4 py-5 md:px-[10%] md:py-6 flex justify-between items-center">
        {/* 왼쪽: 뒤로가기 */}
        <div className="flex items-center gap-3 md:gap-8">
          <img
            src={backIcon}
            alt="이전으로 돌아가기"
            className="cursor-pointer md:w-6  "
            onClick={handleBack}
          />
          <p className="text-lg md:text-2xl font-bold ">아티스트 선택</p>
        </div>

        <div className="hidden md:block">
          <Button outline>선택 완료</Button>
        </div>
        <div className="flex gap-2 items-center  font-bold md:hidden">
          <p className="text-[20px] md:text-[24px] ">1</p>
          <FinishButton onClick={handleBack} />
        </div>
      </header>

      <main className=" w-full min-h-screen md:flex md:px-[10%] md:py-6">
        <section className="w-full md:w-2/3 md:pr-11">
          <div className="p-4 md:p-0">
            <SearchBar placeholder="음악, 아티스트 검색하기" />
          </div>

          <div className="mt-4 space-y-2">
            {topArtistList.map((artist, index) => (
              <article
                key={index}
                className="flex items-center justify-between px-4 py-2 md:px-0  rounded cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={sample}
                    alt=""
                    className="w-[50px] h-[50px] rounded-sm"
                  />
                  <h2 className="font-bold text-sm md:text-base text-text-base">
                    {artist}
                  </h2>
                </div>
                <button onClick={() => toggleSelect(index)}>
                  <img src={selected[index] ? check : plus} alt="추가하기" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* 오른쪽 영역: 데스크탑 전용 */}
        <aside className="hidden md:block md:w-1/3  bg-white opacity-40 rounded-lg shadow-lg p-5 h-[500px]">
          <h3 className="text-lg font-semibold mb-3">선택한 아티스트</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {/* {topArtistList.map(
              (artist, index) =>
                selected[index] && <li key={index}>{artist}</li>
            )} */}
            <li className="text-center">아티스트를 선택해 주세요.</li>
          </ul>
        </aside>
      </main>
    </>
  );
}
