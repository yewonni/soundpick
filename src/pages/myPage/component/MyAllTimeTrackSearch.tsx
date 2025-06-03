import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericSearchUI from "../../ musicAnalysis/component/GenericSearchUI";
import { trackSearch } from "../../../api/search/mainSearch";
import { useLoading } from "../../../context/LoadingContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleTrack } from "../../../store/MyAllTimeSlice";

type Item = {
  imageSrc: string;
  title: string;
  subTitle?: string;
  seq?: string;
  spotifyTrackId?: string;
  trackArtistNameList?: string[];
};

const MAX_TRACKS = 10;

export default function MyAllTimeTrackSearch() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTrackSeqs = useAppSelector((state) =>
    state.myAllTimeHitsList.editedList.map((t) => t.spotifyTrackSeq)
  );
  const [error, setError] = useState("");
  const { loading } = useLoading();
  const [keyword, setKeyword] = useState("");
  const [searchedTracks, setSearchedTracks] = useState<Item[] | null>(null);
  const [isSearched, setIsSearched] = useState(false);

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

  const currentCount = selectedTrackSeqs.length;

  const canSelectMore = () => {
    return currentCount < MAX_TRACKS;
  };

  const toggleSelect = (item: Item) => {
    const isCurrentlySelected = selectedTrackSeqs.includes(item.seq!);

    if (isCurrentlySelected) {
      dispatch(
        toggleTrack({
          spotifyTrackSeq: item.seq!,
          spotifyTrackId: item.spotifyTrackId!,
          name: item.title,
          imageList: [{ url: item.imageSrc }],
          rank: 0,
          trackArtistNameList: item.trackArtistNameList ?? [],
        })
      );
      return;
    }

    if (!canSelectMore()) {
      alert("최대 10곡까지 선택할 수 있어요!");
      return;
    }

    dispatch(
      toggleTrack({
        spotifyTrackSeq: item.seq!,
        spotifyTrackId: item.spotifyTrackId!,
        name: item.title,
        imageList: [{ url: item.imageSrc }],
        rank: 0,
        trackArtistNameList: item.trackArtistNameList ?? [],
      })
    );
  };
  const handleBack = () => {
    navigate("/my-hits", { state: { fromEdit: true } });
  };

  return (
    <GenericSearchUI
      title="All Time Hits"
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
