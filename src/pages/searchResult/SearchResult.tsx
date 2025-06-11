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
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

    const fetchData = async () => {
      try {
        setIsSearched(false);

        const pageSize = 15;
        const page = currentPage - 1;
        if (isResultType === "song") {
          const res = await trackSearch(page, pageSize, keyword);
          const content = res.data.data.content;
          const total = Number(res.data.data.totalElements);
          const calculatedTotalPages = Math.ceil(total / pageSize);
          const MAX_PAGE_LIMIT = 15;

          const tracks = content.map((item) => ({
            imageSrc: item.imageList[0]?.url ?? catImg,
            title: item.name,
            subTitle:
              Array.isArray(item.trackArtistNameList) &&
              item.trackArtistNameList.length > 0
                ? item.trackArtistNameList.join(", ")
                : "unknown",
            seq: item.spotifyTrackSeq,
            spotifyTrackId: item.spotifyTrackId,
          }));

          setTrackResult(tracks);
          setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));
        } else {
          const res = await playlistSearch(page, pageSize, keyword);
          const content = res.data.data.content;
          const total = Number(res.data.data.totalElements);
          const calculatedTotalPages = Math.ceil(total / pageSize);
          const MAX_PAGE_LIMIT = 15;

          setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));

          const playlists = content.map((item) => ({
            imageSrc: item.imageList[0]?.url ?? catImg,
            title: item.name,
            subTitle: "",
            seq: item.seq,
          }));

          setPlaylistResult(playlists);
          setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));
        }
      } catch (error) {
        toast.error("검색 요청 중 오류가 발생했습니다.");
      } finally {
        setIsSearched(true);
      }
    };

    fetchData();
  }, [keyword, currentPage, isResultType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setInputValue(keyword);
    setCurrentPage(1);
  }, [keyword, setInputValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [isResultType]);

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
      <div className="bg-[linear-gradient(360deg,_#f9d8d0,_#9e6c85)]">
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
                  ? "text-text-base font-bold border-b-2 border-text-base"
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
          {(isResultType === "song"
            ? trackResult.length
            : playlistResult.length) > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </>
  );
}
