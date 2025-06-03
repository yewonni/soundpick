import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenericSearchUI from "./GenericSearchUI";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { trackSearch } from "../../../api/search/mainSearch";
import { useLoading } from "../../../context/LoadingContext";
import { useTrackSelection } from "../../../context/TrackSelectionContext";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyTrackId?: string;
  trackArtistNameList?: string[];
};

const MAX_TRACKS = 20;

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
      setError("");
      setIsSearched(true);
      setSearchedTracks([]);
      const res = await trackSearch(0, 10, keyword);
      const searchData = res.data.data.content.map((result) => ({
        imageSrc: result.imageList[0]?.url ?? "",
        title: result.name,
        subTitle: Array.isArray(result.trackArtistNameList)
          ? result.trackArtistNameList.join(", ")
          : result.trackArtistNameList || "",
        seq: result.spotifyTrackSeq,
        spotifyTrackId: result.spotifyTrackId,
        trackArtistNameList: Array.isArray(result.trackArtistNameList)
          ? result.trackArtistNameList
          : [],
      }));
      setSearchedTracks(searchData);
    } catch (error) {
      console.error(error, "오류가 발생했습니다.");
      setError("검색에 실패했습니다.");
    }
  };

  const displayedTracks: Item[] = searchedTracks || [];

  const toggleSelect = (track: Item) => {
    const currentSelectedCount = selectedTracks.length;
    const isCurrentlySelected = selectedTracks.some((t) => t.seq === track.seq);

    // 이미 추천에 포함되어 있는 곡이면 선택 불가
    const isAlreadyInRecommendation = trackList.some(
      (t) => t.spotifyTrackId === track.spotifyTrackId
    );

    if (isAlreadyInRecommendation) {
      alert("이미 추천된 곡입니다.");
      return;
    }

    if (!isCurrentlySelected && currentSelectedCount >= MAX_TRACKS) {
      alert(`트랙은 최대 ${MAX_TRACKS}곡까지만 선택할 수 있어요!`);
      return;
    }

    toggleTrack(track);
  };

  const canSelectMore = () => {
    return currentCount < MAX_TRACKS;
  };

  const handleBack = () => {
    navigate("/recommendation", {
      state: {
        currentStep: location.state?.fromStep || 1,
        deletedTracks: deletedTrackSeqs,
      },
    });
  };

  return (
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
      maxCount={MAX_TRACKS}
      currentCount={currentCount}
      canSelectMore={canSelectMore()}
      itemType="트랙"
    />
  );
}
