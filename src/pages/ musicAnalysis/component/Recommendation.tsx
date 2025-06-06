import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate, useLocation } from "react-router-dom";
import minus from "../../../images/minus-icon.svg";
import nextIcon from "../../../images/chevron-right.svg";
import catImg from "../../../images/music-cat-full.png";
import Button from "../../../components/Button";
import { useAnalysisResult } from "../../../context/AnalysisResultContext";
import { useAuth } from "../../../context/AuthContext";
import {
  deleteTrack,
  deleteArtist,
  editTrackList,
  editArtistList,
} from "../../../api/analysis/myPreference";
import { useTrackSelection } from "../../../context/TrackSelectionContext";
import { useArtistSelection } from "../../../context/ArtistSelectionContext";
import { useArtistAnalysis } from "../../../context/ArtistAnalysisContext";
import { usePreventBack } from "../../../hooks/usePreventBack";
import ConfirmExitModal from "../../../components/ConfirmExitModal";

export default function Recommendation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTracks, setTracks, removeTrack } = useTrackSelection();
  const { selectedArtists, setArtists } = useArtistSelection();
  const { resetArtists } = useArtistAnalysis();
  const { userNickname } = useAuth();
  const { recommendationData } = useAnalysisResult();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<number>(location.state?.currentStep || 1);
  const [deletedTracks, setDeletedTracks] = useState<any[]>([]);
  const [deletedArtists, setDeletedArtists] = useState<any[]>([]);
  const [trackListState, setTrackListState] = useState<any[]>([]);
  const [artistListState, setArtistListState] = useState<any[]>([]);

  type Item = {
    imageSrc: string;
    title: string;
    subTitle?: string;
    seq?: string;
    spotifyTrackId?: string;
  };

  // 브라우저 뒤로가기 방지
  const { showConfirmModal, handleConfirm, handleCancel } = usePreventBack({
    redirectPath: "/",
    message: "",
    onConfirm: () => {
      setTracks([]);
      setArtists([]);
      resetArtists();
    },
    onCancel: () => {
      console.log("사용자가 페이지에 머물기로 선택");
    },
  });

  // 추천 리스트가 최초 랜더링될 때 초기 리스트
  useEffect(() => {
    if (recommendationData?.data) {
      setTrackListState(recommendationData.data.trackList?.slice(0, 20) || []);
      setArtistListState(
        recommendationData.data.artistList?.slice(0, 20) || []
      );
      setLoading(false);
    }
  }, [recommendationData]);

  //삭제 예정 아이템에 대해, 추천리스트 UI에서 제거 상태 유지
  useEffect(() => {
    if (location.state?.deletedTracks?.length > 0) {
      setDeletedTracks(location.state.deletedTracks);
      setTrackListState((prev) =>
        prev.filter(
          (track) =>
            !location.state.deletedTracks.some(
              (deleted: any) =>
                deleted.recommendTrackSeq === track.recommendTrackSeq
            )
        )
      );
    }
  }, [location.state?.deletedTracks]);

  useEffect(() => {
    if (location.state?.deletedArtists?.length > 0) {
      setDeletedArtists(location.state.deletedArtists);
      setArtistListState((prev) =>
        prev.filter(
          (artist) =>
            !location.state.deletedArtists.some(
              (deleted: any) =>
                deleted.recommendArtistSeq === artist.recommendArtistSeq
            )
        )
      );
    }
  }, [location.state?.deletedArtists]);

  // 트랙 처리
  type TrackStateItem = {
    name: string;
    imageList: { url: string }[];
    trackArtists: { name: string }[];
    recommendTrackSeq?: string; // 기존 추천 항목
    spotifyTrackSeq?: string; // 새로 추가된 항목
    spotifyTrackId?: string;
  };

  useEffect(() => {
    if (selectedTracks?.length > 0) {
      const newTracks: TrackStateItem[] = selectedTracks.map((track: Item) => ({
        name: track.title,
        imageList: [{ url: track.imageSrc || catImg }],
        trackArtists:
          typeof track.subTitle === "string" && track.subTitle.length > 0
            ? track.subTitle.split(", ").map((name) => ({ name }))
            : [],
        spotifyTrackSeq: track.seq,
        spotifyTrackId: track.spotifyTrackId,
      }));

      setTrackListState((prev: TrackStateItem[]) => [...newTracks, ...prev]);
    }
  }, [selectedTracks]);

  // 아티스트 처리
  useEffect(() => {
    if (selectedArtists.length > 0) {
      const newArtists = selectedArtists.map((artist) => ({
        name: artist.title,
        imageList: [{ url: artist.imageSrc || catImg }],
        spotifyArtistSeq: artist.seq,
      }));

      setArtistListState((prev) => [...newArtists, ...prev]);
    }
  }, [selectedArtists]);

  useEffect(() => {
    if (step === 3) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTracks([]);
      setArtists([]);
    }
  }, [step]);

  if (loading) {
    return (
      <div className="p-4 text-primary text-center">
        추천 데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (!recommendationData?.data) {
    return (
      <div className="p-4 text-red-500 text-center">
        추천 데이터를 불러오는데 문제가 발생했습니다.
      </div>
    );
  }

  if (step === 3) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen p-4 gap-4"
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 0%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        <h1 className="font-medium text-text-base md:text-lg text-base flex items-center gap-1">
          <span className="text-text-subtle font-bold text-xl md:text-2xl">
            "음악 취향 분석"{" "}
          </span>
          <span>이 완성됐어요!</span>
        </h1>
        <p className="mt-2 md:text-lg text-text-base">
          이제 나만의 사운드 트랙을 즐겨볼까요?
        </p>
        <button
          className="border border-text-base rounded-[20px] text-text-base font-semibold p-2 px-8 hover:font-bold hover:bg-purple-500 active:bg-purple-600"
          onClick={() => {
            setTracks([]);
            setArtists([]);
            resetArtists();
            navigate("/");
          }}
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  const isTrackStep = step === 1;

  const visibleTracks = trackListState.filter(
    (t) =>
      !deletedTracks.some((d) => d.recommendTrackSeq === t.recommendTrackSeq)
  );

  const visibleArtists = artistListState.filter(
    (a) =>
      !deletedArtists.some((d) => d.recommendArtistSeq === a.recommendArtistSeq)
  );

  const list = isTrackStep ? visibleTracks : visibleArtists;

  const handleDeleteItem = (item: any) => {
    if (isTrackStep) {
      setTrackListState((prev) =>
        prev.filter(
          (i) =>
            i.recommendTrackSeq !== item.recommendTrackSeq &&
            i.spotifyTrackSeq !== item.spotifyTrackSeq
        )
      );

      if (item.recommendTrackSeq) {
        setDeletedTracks((prev) => [...prev, item]);
      } else {
        removeTrack(item.spotifyTrackSeq || item.seq);
      }
    } else {
      setArtistListState((prev) =>
        prev.filter(
          (i) =>
            i.recommendArtistSeq !== item.recommendArtistSeq &&
            i.spotifyArtistSeq !== item.spotifyArtistSeq
        )
      );

      if (item.recommendArtistSeq) {
        setDeletedArtists((prev) => [...prev, item]);
      } else {
        setArtists(
          selectedArtists.filter((a) => a.seq !== item.spotifyArtistSeq)
        );
      }
    }
  };

  const MIN_TRACKS = 5;
  const MAX_TRACKS = 20;
  const MIN_ARTISTS = 3;
  const MAX_ARTISTS = 20;

  const handleAddButtonClick = () => {
    const currentCount = isTrackStep
      ? visibleTracks.length
      : visibleArtists.length;
    const maxCount = isTrackStep ? MAX_TRACKS : MAX_ARTISTS;
    const itemType = isTrackStep ? "트랙" : "아티스트";

    if (currentCount >= maxCount) {
      toast.error(
        `${itemType}은 최대 ${maxCount}${
          isTrackStep ? "곡" : "명"
        }까지만 선택할 수 있어요!`
      );
      return;
    }

    navigate(isTrackStep ? "/edit-track" : "/edit-artist", {
      state: {
        fromStep: step,
        ...(isTrackStep ? { deletedTracks } : { deletedArtists }),
      },
    });
  };

  const isAddButtonDisabled = () => {
    const currentCount = isTrackStep
      ? visibleTracks.length
      : visibleArtists.length;
    const maxCount = isTrackStep ? MAX_TRACKS : MAX_ARTISTS;
    return currentCount >= maxCount;
  };

  const handleNextStep = async () => {
    if (isTrackStep) {
      if (visibleTracks.length < MIN_TRACKS) {
        toast.error(`트랙은 최소 ${MIN_TRACKS}개 이상 선택해주세요!`);
        return;
      }
      if (visibleTracks.length > MAX_TRACKS) {
        toast.error(`트랙은 최대 ${MAX_TRACKS}개까지만 선택할 수 있어요!`);
        return;
      }
    } else {
      if (visibleArtists.length < MIN_ARTISTS) {
        toast.error(`아티스트는 최소 ${MIN_ARTISTS}명 이상 선택해주세요!`);
        return;
      }
      if (visibleArtists.length > MAX_ARTISTS) {
        toast.error(`아티스트는 최대 ${MAX_ARTISTS}명까지만 선택할 수 있어요!`);
        return;
      }
    }

    try {
      if (deletedTracks.length > 0) {
        await deleteTrack(
          deletedTracks.map((item) => ({
            recommendTrackSeq: item.recommendTrackSeq,
          }))
        );
        setDeletedTracks([]);
      }
      if (deletedArtists.length > 0) {
        await deleteArtist(
          deletedArtists.map((item) => ({
            recommendArtistSeq: item.recommendArtistSeq,
          }))
        );
        setDeletedArtists([]);
      }
      if (selectedTracks.length > 0) {
        const validTracks = selectedTracks
          .filter((item) => item.seq)
          .map((item) => ({
            spotifyTrackSeq: item.seq as string,
          }));

        await editTrackList(validTracks);
        setTracks([]);
      }

      if (selectedArtists.length > 0) {
        const validArtist = selectedArtists
          .filter((item) => item.seq)
          .map((item) => ({
            spotifyArtistSeq: item.seq as string,
          }));

        await editArtistList(validArtist);
        setArtists([]);
      }

      setStep((prev) => prev + 1);
    } catch (err) {
      console.error("삭제 또는 추가 요청 실패:", err);
    }
  };

  return (
    <>
      <header
        className="flex flex-col gap-2 p-4 py-6 pt-9 text-[20px] md:px-[15%] md:text-2xl"
        style={{
          backgroundImage:
            "linear-gradient(360deg, #d1c3fc 20%, #a5b4fc 50%, #dbeafe 100%)",
        }}
      >
        <h1>
          <span className="font-bold">{userNickname}</span>님에게{" "}
          <span
            className={`font-bold ${
              isTrackStep ? "text-text-hover" : "text-text-subtle"
            }`}
          >
            {isTrackStep ? "추천된 트랙," : "추천된 아티스트,"}
          </span>
          <br />
          <span>
            {isTrackStep ? "마음에 드시나요?" : "취향에 맞는지 확인해보세요!"}
          </span>
        </h1>

        <div className="text-sm md:text-base text-text-subtle mt-2 flex flex-col gap-2">
          <span className="text-xs md:text-sm text-[#333]">
            최대 {isTrackStep ? "20곡" : "20명"}까지 자유롭게 선택할 수 있어요!
          </span>
        </div>
      </header>

      <main className="bg-white w-full p-4 py-6 min-h-screen pb-[40px] md:px-[15%]">
        {list.length > 0 ? (
          list.map((item, index) => (
            <article
              key={index}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.imageList?.[0]?.url || catImg}
                  alt={item.name}
                  className="w-[60px] h-[60px] rounded-sm md:w-[80px] md:h-[80px]"
                />
                <div className="flex flex-col gap-1 max-w-[200px] md:max-w-[500px]">
                  <h2 className="font-bold text-xs md:text-sm truncate">
                    {item.name}
                  </h2>
                  {isTrackStep && (
                    <p className="text-[#333] text-xs truncate">
                      {(
                        item as { trackArtists: { name: string }[] }
                      ).trackArtists
                        ?.map((a) => a.name)
                        .join(", ")}
                    </p>
                  )}

                  {!isTrackStep && (
                    <p className="text-[#333] text-xs">추천 아티스트</p>
                  )}
                </div>
              </div>
              <img
                onClick={() => handleDeleteItem(item)}
                src={minus}
                alt="제거하기"
                className="cursor-pointer"
              />
            </article>
          ))
        ) : (
          <p className="text-center py-4 text-gray-600">
            {isTrackStep
              ? "추천 트랙이 없습니다."
              : "추천 아티스트가 없습니다."}
          </p>
        )}

        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-3">
            <Button
              onClick={handleAddButtonClick}
              disabled={isAddButtonDisabled()}
            >
              추가하기
            </Button>
            <span
              className={`bg-gray-100 px-3 py-1 rounded-full shadow font-medium ${
                isAddButtonDisabled() ? "text-red-500" : "text-primary"
              }`}
            >
              {isTrackStep
                ? `${visibleTracks.length} / ${MAX_TRACKS}곡`
                : `${visibleArtists.length} / ${MAX_ARTISTS}명`}
            </span>
          </div>

          <img
            src={nextIcon}
            alt="다음으로 이동하기"
            className="cursor-pointer"
            onClick={handleNextStep}
          />
        </div>
      </main>
      <ConfirmExitModal
        isOpen={showConfirmModal}
        message="지금 나가면 추천 결과가 그대로 저장돼요. 괜찮으신가요?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="홈으로 이동"
        cancelText="계속 수정"
      />
    </>
  );
}
