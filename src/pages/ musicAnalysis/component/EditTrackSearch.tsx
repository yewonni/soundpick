import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenericSearchUI from "../../../components/GenericSearchUI";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { trackSearch } from "../../../api/search/mainSearch";
import { useLoading } from "../../../context/LoadingContext";
import { useTrackSelection } from "../../../context/TrackSelectionContext";
import { RECOMMENDATION_LIMITS } from "../../../constants/constants";

interface Item {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyTrackId?: string;
  trackArtistNameList?: string[];
}

export default function EditTrackSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTrack, selectedTracks } = useTrackSelection();
  const { recommendationData } = useAnalysisResult();
  const [error, setError] = useState("");
  const { loading } = useLoading();
  const [keyword, setKeyword] = useState("");
  const [searchedTracks, setSearchedTracks] = useState<Item[] | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let trackList = recommendationData?.data.trackList || [];
  const deletedTrackSeqs = location.state?.deletedTracks || [];

  const selectedTrackSeqs = selectedTracks.map((track) => track.seq ?? "");
  const originalTrackSeqs = trackList
    .slice(0, 20)
    .map((track) => track.recommendTrackSeq);

  const newlyAddedSeqs = selectedTrackSeqs.filter(
    (seq) => !originalTrackSeqs.includes(seq)
  );

  const currentCount =
    originalTrackSeqs.length - deletedTrackSeqs.length + newlyAddedSeqs.length;

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
      setSearchedTracks([]);

      const pageSize = 15;
      const page = currentPage - 1;

      const res = await trackSearch(page, pageSize, keyword);

      const total = Number(res.data.data.totalElements);
      const calculatedTotalPages = Math.ceil(total / pageSize);
      const MAX_PAGE_LIMIT = 15;

      const searchData = res.data.data.content.map((result) => ({
        imageSrc: result.imageList[0]?.url ?? "",
        title: result.name,
        subTitle: Array.isArray(result.trackArtistNameList)
          ? result.trackArtistNameList.join(", ")
          : result.trackArtistNameList || "unknown",
        seq: result.spotifyTrackSeq,
        spotifyTrackId: result.spotifyTrackId,
        trackArtistNameList: Array.isArray(result.trackArtistNameList)
          ? result.trackArtistNameList
          : [],
      }));
      setSearchedTracks(searchData);
      setTotalPages(Math.min(calculatedTotalPages, MAX_PAGE_LIMIT));
    } catch (error) {
      setError("검색에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const displayedTracks: Item[] = searchedTracks || [];

  const toggleSelect = (track: Item) => {
    const isCurrentlySelected = selectedTracks.some((t) => t.seq === track.seq);
    const originalTrackIds = trackList
      .slice(0, 20)
      .map((t) => t.spotifyTrackId ?? "");

    const selectedTrackSeqs = selectedTracks.map((t) => t.seq ?? "");
    const newlyAddedSeqs = selectedTrackSeqs.filter(
      (seq) => !originalTrackSeqs.includes(seq)
    );

    const currentCount =
      originalTrackIds.length - deletedTrackSeqs.length + newlyAddedSeqs.length;

    if (!isCurrentlySelected) {
      if (originalTrackIds.includes(track.spotifyTrackId ?? "")) {
        toast.error("이미 추천된 곡입니다.");
        return;
      }

      if (currentCount >= RECOMMENDATION_LIMITS.MAX_TRACKS) {
        toast.error(
          `트랙은 최대 ${RECOMMENDATION_LIMITS.MAX_TRACKS}곡까지만 선택할 수 있어요!`
        );
        return;
      }
    }

    toggleTrack(track);
  };

  const canSelectMore = () => {
    return currentCount < RECOMMENDATION_LIMITS.MAX_TRACKS;
  };

  const handleBack = () => {
    navigate("/recommendation", {
      state: {
        currentStep: location.state?.fromStep || 1,
        deletedTracks: deletedTrackSeqs,
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

  return (
    <>
      <GenericSearchUI
        title="추천 트랙"
        onBack={handleBack}
        items={displayedTracks}
        selectedItems={selectedTrackSeqs}
        keyword={keyword}
        onKeywordChange={handleInputChange}
        onSearch={handleSearch}
        onToggleSelect={toggleSelect}
        error={error}
        isSearched={isSearched}
        loading={loading}
        maxCount={RECOMMENDATION_LIMITS.MAX_TRACKS}
        currentCount={currentCount}
        canSelectMore={canSelectMore()}
        itemType="트랙"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
