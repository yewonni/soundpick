import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../images/logo.svg";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import { MusicCardDataProps } from "../../types/MusicCard";
import SongResult from "./component/SongResult";
import PlaylistResult from "./component/PlaylistResult";
import NoSearchResult from "./component/NoSearchResult";
import useMediaQuery from "../../hooks/useMediaQuery";
import { trackSearch, playlistSearch } from "../../api/search/mainSearch";
import { useLoading } from "../../context/LoadingContext";
import { useSearchInput } from "../../context/SearchContext";
import catImg from "../../images/music-cat-full.png";
import { DataCardProps } from "./component/SongResult";

export default function SearchResult() {
  const { inputValue, setInputValue } = useSearchInput();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { loading } = useLoading();
  const [isSearched, setIsSearched] = useState(false);
  const [isResultType, setIsResultType] = useState<"song" | "playlist">("song");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") ?? "";
  const [trackResult, setTrackResult] = useState<DataCardProps[]>([]);
  const [playlistResult, setPlaylistResult] = useState<MusicCardDataProps[]>(
    []
  );

  // 검색 관련 함수들
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!inputValue.trim()) return;
    navigate(`/search-result?q=${encodeURIComponent(inputValue)}`);
  };

  const handleResultType = (resultType: "song" | "playlist") => {
    setIsResultType(resultType);
  };

  useEffect(() => {
    if (!keyword) return;

    setTrackResult([]);
    setPlaylistResult([]);

    const fetchData = async () => {
      try {
        setIsSearched(false);
        const [trackRes, playlistRes] = await Promise.all([
          trackSearch(0, 10, keyword),
          playlistSearch(0, 10, keyword),
        ]);

        const tracks = trackRes.data.data.content.map((item) => ({
          imageSrc: item.imageList[0]?.url ?? catImg,
          title: item.name,
          subTitle: item.trackArtistNameList ?? "알 수 없음",
          seq: item.spotifyTrackSeq,
          spotifyTrackId: item.spotifyTrackId,
        }));

        const playlists = playlistRes.data.data.content.map((item) => ({
          imageSrc: item.imageList[0]?.url ?? catImg,
          title: item.name,
          subTitle: "",
          seq: item.seq,
        }));

        setTrackResult(tracks);
        setPlaylistResult(playlists);
      } catch (error) {
        console.error("검색 에러:", error);
      } finally {
        setIsSearched(true); // 무조건 마지막에 호출 (로딩 끝난 후 데이터를 불러오기 전 짧은 순간동안 검색결과 없음이 표시되는 플리커 현상 방지)
      }
    };

    fetchData();
  }, [keyword]);

  useEffect(() => {
    setInputValue(keyword);
  }, [keyword, setInputValue]);

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <header className="flex justify-center items-center px-4 py-2 h-[70px] md:hidden">
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer md:w-[250px] md:h-[150px]"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>
      <div
        className="bg-[linear-gradient(360deg,_#f9d8d0,_#9e6c85)]
"
      >
        <div className="px-4 pt-4 pb-0 md:px-[10%] md:py-0  text-white">
          <div className="md:hidden">
            <SearchBar
              value={inputValue}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
              placeholder="아티스트, 음악, 플레이리스트"
            />
          </div>
          <div className="flex items-center gap-4 text-sm md:text-base text-secondary font-semibold pl-2 mt-4 md:mt-0 md:pt-5">
            <p
              className={`cursor-pointer pb-1 ${
                isResultType === "song"
                  ? "text-text-base font-bold border-b-2 border-text-base"
                  : ""
              }`}
              onClick={() => handleResultType("song")}
            >
              곡
            </p>
            <p
              className={`cursor-pointer pb-1 ${
                isResultType === "playlist"
                  ? "text-text-base font-bold border-b-2  border-text-base"
                  : ""
              }`}
              onClick={() => handleResultType("playlist")}
            >
              플레이리스트
            </p>
          </div>
        </div>
        <main className="w-full min-h-screen p-4 pt-5 md:px-[10.7%] ">
          {isResultType === "song" && (
            <>
              {!loading && trackResult.length === 0 && isSearched ? (
                <NoSearchResult />
              ) : (
                <SongResult data={trackResult} isMobile={isMobile} />
              )}
            </>
          )}

          {isResultType === "playlist" && (
            <>
              {!loading && playlistResult.length === 0 && isSearched ? (
                <NoSearchResult />
              ) : (
                <PlaylistResult data={playlistResult} isMobile={isMobile} />
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
