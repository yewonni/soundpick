import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GenericSearchUI from "./GenericSearchUI";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { artistSearch } from "../../../api/search/artistSearch";
import { useLoading } from "../../../context/LoadingContext";
import { useArtistSelection } from "../../../context/ArtistSelectionContext";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyArtistId?: string;
  trackArtistNameList?: string[];
};

const MAX_ARTISTS = 20;
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
      setError("");
      setIsSearched(true);
      setSearchedArtists([]);
      const res = await artistSearch(0, 10, keyword);
      const searchData = res.data.data.content.map((result) => ({
        imageSrc: result.imageList[0]?.url ?? "",
        title: result.name,
        seq: result.seq,
        spotifyArtistId: result.spotifyArtistId,
      }));
      setSearchedArtists(searchData);
    } catch (error) {
      console.error(error, "오류가 발생했습니다.");
      setError("검색에 실패했습니다.");
    }
  };

  const displayedArtists: Item[] = searchedArtists || [];

  const toggleSelect = (artist: Item) => {
    const currentSelectedCount = selectedArtists.length;
    const isCurrentlySelected = selectedArtists.some(
      (a) => a.seq === artist.seq
    );
    const isAlreadyInRecommendation = artistList.some(
      (a) => a.spotifyArtistId === artist.spotifyArtistId
    );

    if (isAlreadyInRecommendation) {
      alert("이미 추천된 아티스트입니다.");
      return;
    }

    if (!isCurrentlySelected && currentSelectedCount >= MAX_ARTISTS) {
      alert(`아티스트는 최대 ${MAX_ARTISTS}명까지만 선택할 수 있어요!`);
      return;
    }

    toggleArtist(artist);
  };

  const canSelectMore = () => {
    return selectedArtists.length < MAX_ARTISTS;
  };

  const handleBack = () => {
    navigate("/recommendation", {
      state: {
        currentStep: location.state?.fromStep || 2,
        deletedArtists: location.state?.deletedArtists || [],
      },
    });
  };

  return (
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
      maxCount={MAX_ARTISTS}
      currentCount={currentCount}
      canSelectMore={canSelectMore()}
      itemType="아티스트"
    />
  );
}
