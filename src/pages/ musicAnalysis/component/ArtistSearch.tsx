import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { artistSearch } from "../../../api/search/artistSearch";
import GenericSearchUI from "../../../components/GenericSearchUI";
import { useLoading } from "../../../context/LoadingContext";
import { useArtistAnalysis } from "../../../context/ArtistAnalysisContext";

export default function ArtistSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArtists, toggleArtist } = useArtistAnalysis();
  const { loading } = useLoading();
  const [keyword, setKeyword] = useState("");
  const [searchedArtists, setSearchedArtists] = useState<Item[] | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  type Item = {
    imageSrc: string;
    title: string;
    seq?: string;
    spotifyArtistId?: string;
  };

  const MAX_ARTISTS = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsSearched(true);
      setSearchedArtists([]);

      const pageSize = 15;
      const page = currentPage - 1;

      const res = await artistSearch(page, pageSize, keyword);

      const total = Number(res.data.data.totalElements);
      const calculatedTotalPages = Math.ceil(total / pageSize);
      const MAX_PAGE_LIMIT = 15;

      const searchData = res.data.data.content.map((result) => ({
        imageSrc: result.imageList[0]?.url ?? "",
        title: result.name ?? "",
        seq: result.seq,
        spotifyArtistId: result.spotifyArtistId,
      }));
      setSearchedArtists(searchData);
      setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));
    } catch (error) {
      console.error("검색 오류", error);
      setError("검색에 실패했습니다.");
    }
  };

  const displayedArtists: Item[] = searchedArtists || [];

  const toggleSelect = (artist: Item) => {
    const isCurrentlySelected = selectedArtists.some(
      (a) => a.seq === artist.seq
    );

    // 이미 선택된 아티스트라면 토글 해제만 수행 (중복 체크 생략)
    if (isCurrentlySelected) {
      toggleArtist(artist);
      return;
    }

    // 새로운 선택인 경우에만 중복 체크 수행
    const isAlreadyInRecommendation = selectedArtists.some(
      (a) => a.spotifyArtistId === artist.spotifyArtistId
    );

    if (isAlreadyInRecommendation) {
      toast.error("이미 선택된 아티스트입니다.");
      return;
    }

    if (selectedArtists.length >= MAX_ARTISTS) {
      toast.error(`아티스트는 최대 ${MAX_ARTISTS}명까지만 선택할 수 있어요!`);
      return;
    }

    // 새로운 아티스트 추가
    toggleArtist(artist);
  };

  const canSelectMore = () => {
    return selectedArtists.length < MAX_ARTISTS;
  };

  const handleBack = () => {
    if (location.state?.fromStep2) {
      navigate("/music-analysis", {
        state: {
          currentStep: 2,
          isFromSearch: true,
          selectedGenre: location.state.selectedGenre,
        },
      });
    } else {
      navigate(-1);
    }
  };

  // 페이지네이션
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    if (isSearched) {
      handleSearch();
    }
  }, [currentPage]);

  return (
    <>
      <GenericSearchUI
        title="아티스트"
        items={displayedArtists}
        selectedItems={selectedArtists.map((a) => a.seq ?? "")}
        keyword={keyword}
        onKeywordChange={handleInputChange}
        onSearch={handleSearch}
        onToggleSelect={toggleSelect}
        onBack={handleBack}
        error={error}
        isSearched={isSearched}
        loading={loading}
        maxCount={MAX_ARTISTS}
        currentCount={selectedArtists.length}
        canSelectMore={canSelectMore()}
        itemType="아티스트"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
