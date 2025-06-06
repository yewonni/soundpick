import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericSearchUI from "../../../components/GenericSearchUI";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    try {
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
      console.error(error, "오류가 발생했습니다.");
      setError("검색 실패. 다시 시도해주세요.");
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
      toast.error("최대 10곡까지 선택할 수 있어요!");
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
