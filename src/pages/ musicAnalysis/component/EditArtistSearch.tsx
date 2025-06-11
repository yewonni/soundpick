import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenericSearchUI from "../../../components/GenericSearchUI";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { artistSearch } from "../../../api/search/artistSearch";
import { useLoading } from "../../../context/LoadingContext";
import { useArtistSelection } from "../../../context/ArtistSelectionContext";
import { RECOMMENDATION_LIMITS } from "../../../constants/constants";

interface Item {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyArtistId?: string;
  trackArtistNameList?: string[];
}

export default function EditArtistSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendationData } = useAnalysisResult();
  const { loading } = useLoading();
  const { selectedArtists, toggleArtist } = useArtistSelection();
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchedArtists, setSearchedArtists] = useState<Item[] | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let artistList = recommendationData?.data.artistList || [];
  const deletedArtistSeqs = location.state?.deletedArtists || [];

  const selectedArtistSeqs = selectedArtists.map((artist) => artist.seq ?? "");
  const originalArtistSeqs = artistList
    .slice(0, 20)
    .map((artist) => artist.recommendArtistSeq);

  const newlyAddedSeqs = selectedArtistSeqs.filter(
    (seq) => !originalArtistSeqs.includes(seq)
  );

  const currentCount =
    originalArtistSeqs.length -
    deletedArtistSeqs.length +
    newlyAddedSeqs.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) {
        toast.error("검색어를 입력해주세요.");
        return;
      }
      setError("");
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
        title: result.name ?? "unknown",
        seq: result.seq,
        spotifyArtistId: result.spotifyArtistId,
      }));
      setSearchedArtists(searchData);
      setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));
    } catch (error) {
      console.error(error, "오류가 발생했습니다.");
      setError("검색 실패. 다시 시도해주세요.");
    }
  };

  const displayedArtists: Item[] = searchedArtists || [];

  const toggleSelect = (artist: Item) => {
    const isCurrentlySelected = selectedArtists.some(
      (a) => a.seq === artist.seq
    );
    const originalArtistIds = artistList
      .slice(0, 20)
      .map((a) => a.spotifyArtistId);
    const selectedArtistSeqs = selectedArtists.map((a) => a.seq ?? "");

    const newlyAddedSeqs = selectedArtistSeqs.filter(
      (seq) => !originalArtistSeqs.includes(seq)
    );

    const currentCount =
      originalArtistSeqs.length -
      deletedArtistSeqs.length +
      newlyAddedSeqs.length;

    if (!isCurrentlySelected) {
      if (originalArtistIds.includes(artist.spotifyArtistId ?? "")) {
        toast.error("이미 추천된 아티스트입니다.");
        return;
      }

      if (currentCount >= RECOMMENDATION_LIMITS.MAX_ARTISTS) {
        toast.error(
          `아티스트는 최대 ${RECOMMENDATION_LIMITS.MAX_ARTISTS}명까지만 선택할 수 있어요!`
        );
        return;
      }
    }

    toggleArtist(artist);
  };

  const canSelectMore = () => {
    return currentCount < RECOMMENDATION_LIMITS.MAX_ARTISTS;
  };

  const handleBack = () => {
    navigate("/recommendation", {
      state: {
        currentStep: location.state?.fromStep || 2,
        deletedArtists: location.state?.deletedArtists || [],
      },
    });
  };

  // 페이지네이션
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (keyword.trim()) {
      setCurrentPage(1);
      setIsSearched(false);
    }
  }, [keyword]);

  useEffect(() => {
    if (isSearched) {
      handleSearch();
    }
  }, [currentPage]);

  return (
    <>
      <GenericSearchUI
        title="추천 아티스트"
        onBack={handleBack}
        items={displayedArtists}
        selectedItems={selectedArtists.map((artist) => artist.seq ?? "")}
        keyword={keyword}
        onKeywordChange={handleInputChange}
        onSearch={handleSearch}
        onToggleSelect={toggleSelect}
        error={error}
        isSearched={isSearched}
        loading={loading}
        maxCount={RECOMMENDATION_LIMITS.MAX_ARTISTS}
        currentCount={currentCount}
        canSelectMore={canSelectMore()}
        itemType="아티스트"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
