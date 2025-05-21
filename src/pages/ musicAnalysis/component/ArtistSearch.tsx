import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import backIcon from "../../../images/chevron-left.svg";
import catImg from "../../../images/music-cat-full.png";
import FinishButton from "../../../components/FinishButton";
import SearchBar from "../../../components/SearchBar";
import plus from "../../../images/plus-icon.svg";
import check from "../../../images/check-on.svg";
import Button from "../../../components/Button";
import { getArtists } from "../../../api/analysis/artists";
import { artistSearch } from "../../../api/search/artistSearch";

export default function ArtistSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [artists, setArtists] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchedArtists, setSearchedArtists] = useState<any[] | null>(null);

  // 선택된 아티스트 정보를 location state에서 가져오기
  useEffect(() => {
    if (
      location.state?.selectedArtist &&
      location.state.selectedArtist.length > 0
    ) {
      setSelectedArtists(location.state.selectedArtist);
    }
  }, [location.state]);

  //기본 아티스트 목록 불러오기
  const fetchArtists = async (subject: "global") => {
    try {
      const res = await getArtists(subject, 0, 10);
      const artistData = res.data.data.content.map((artist) => ({
        imageSrc: artist.imageList[0]?.url ?? "",
        title: artist.name,
      }));
      setArtists(artistData);
    } catch (error) {
      console.error(`${subject} 아티스트 불러오기 실패`, error);
      setError("아티스트 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchArtists("global");
  }, []);

  //검색하기
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await artistSearch(0, 10, keyword);
      const searchData = res.data.data.content.map((result) => ({
        imageSrc: result.imageList[0]?.url ?? "",
        title: result.name,
      }));
      setSearchedArtists(searchData);
    } catch (error) {
      console.error(error, "오류가 발생했습니다.");
      setError("검색에 실패했습니다.");
    }
  };

  const displayedArtists = searchedArtists ?? artists;

  // 검색한 아티스트 선택하기
  const toggleSelect = (artistName: string) => {
    setSelectedArtists((prev) =>
      prev.includes(artistName)
        ? prev.filter((name) => name !== artistName)
        : [...prev, artistName]
    );
  };

  // 검색화면에서 나갈 때 선택한 아티스트 정보와 장르 정보를 함께 전달
  const handleBack = () => {
    if (location.state?.fromStep2) {
      navigate("/music-analysis", {
        state: {
          currentStep: 2,
          selectedArtist: selectedArtists,
          selectedGenre: location.state.selectedGenre,
        },
      });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header className="bg-bg-sub px-4 py-5 md:px-[20%] md:py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-8">
          <img
            src={backIcon}
            alt="이전으로 돌아가기"
            className="cursor-pointer md:w-6  "
            onClick={handleBack}
          />
          <p className="text-lg md:text-2xl font-bold  ">아티스트 선택</p>
        </div>

        <div className="hidden md:block">
          <Button onClick={handleBack}>선택 완료</Button>
        </div>
        <div className="flex gap-2 items-center  font-bold md:hidden">
          <p className="text-[20px] md:text-[24px] ">
            {selectedArtists.length}
          </p>
          <FinishButton onClick={handleBack} />
        </div>
      </header>

      <main className=" w-full min-h-screen md:flex md:px-[20%] md:py-6">
        <section className="w-full">
          <div className="p-4 md:p-0 flex justify-center w-full md:mb-10">
            <SearchBar
              onSubmit={handleSearch}
              value={keyword}
              onChange={handleInputChange}
              placeholder="나만의 아티스트를 검색해보세요!"
            />
          </div>

          <div className="space-y-2 md:mt-5 md:border md:border-bg-peach rounded-md md:p-3 ">
            {displayedArtists.map((artist, index) => (
              <article
                key={artist.title}
                className="flex items-center justify-between px-4 py-2 md:py-5 rounded cursor-pointer "
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={artist.imageSrc || catImg}
                    alt={artist.title || "아티스트 이미지 없음"}
                    className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-sm object-cover bg-gray-100"
                  />
                  <h2 className="font-bold text-sm md:text-base text-text-base">
                    {artist.title}
                  </h2>
                </div>
                <button onClick={() => toggleSelect(artist.title)}>
                  <img
                    src={selectedArtists.includes(artist.title) ? check : plus}
                    alt="추가하기"
                  />
                </button>
              </article>
            ))}

            {error && <p className="text-gray-100 pt-3 ">{error}</p>}
          </div>
        </section>
      </main>
    </>
  );
}
