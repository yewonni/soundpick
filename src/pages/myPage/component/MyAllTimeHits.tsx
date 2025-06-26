import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import prevIcon from "../../../images/chevron-left.svg";
import RegisterButton from "../../../components/RegisterButton";
import sample from "../../../images/music-cat-full.png";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchMyAllTimeHits,
  addMyAllTimeTrack,
  deleteMyAllTimeTrack,
  resetState,
} from "../../../store/MyAllTimeSlice";
import { useLoading } from "../../../context/LoadingContext";
import { showToast } from "../../../utils/toast";

interface TrackToDelete {
  preferenceTrackSeq: string;
  rank: number;
}

export default function MyAllTimeHits() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useLoading();
  const fromEdit = location.state?.fromEdit;
  const dispatch = useAppDispatch();
  const myAllTimeState = useAppSelector((state) => state.myAllTimeHitsList);
  const editedList = myAllTimeState?.editedList || [];
  const originalList = myAllTimeState?.originalList || [];
  const { userNickname } = useAuth();
  const [deletedTracks, setDeletedTracks] = useState<string[]>([]);

  useEffect(() => {
    if (!fromEdit) {
      dispatch(resetState());
      dispatch(fetchMyAllTimeHits());
    }
  }, [dispatch, fromEdit]);

  const handleCheckboxChange = (trackSeq: string, isChecked: boolean) => {
    if (isChecked) {
      setDeletedTracks((prev) => [...prev, trackSeq]);
    } else {
      setDeletedTracks((prev) => prev.filter((seq) => seq !== trackSeq));
    }
  };

  // 선택된 트랙들 삭제하기
  const handleDeleteSelected = async () => {
    if (deletedTracks.length === 0) {
      showToast("삭제할 곡을 선택해주세요.");
      return;
    }

    if (
      window.confirm(`선택한 ${deletedTracks.length}곡을 삭제하시겠습니까?`)
    ) {
      try {
        const tracksToDelete = originalList.filter((track) =>
          deletedTracks.includes(track.spotifyTrackSeq)
        );
        const validTracksToDelete = tracksToDelete.filter(
          (track) => track.preferenceTrackSeq !== undefined
        );

        if (validTracksToDelete.length === 0) {
          showToast(
            "삭제할 수 있는 트랙이 없습니다. (아직 저장되지 않은 트랙들입니다)"
          );
          return;
        }

        if (validTracksToDelete.length !== tracksToDelete.length) {
          showToast("일부 트랙은 아직 저장되지 않아 삭제할 수 없습니다.");
        }

        const deletePayload: TrackToDelete[] = validTracksToDelete.map(
          (track) => ({
            preferenceTrackSeq: track.preferenceTrackSeq!,
            rank: track.rank,
          })
        );

        const result = await dispatch(deleteMyAllTimeTrack(deletePayload));

        if (deleteMyAllTimeTrack.fulfilled.match(result)) {
          setDeletedTracks([]);
          showToast("선택한 곡이 삭제되었습니다.", "success");
        } else {
          throw new Error("삭제 실패");
        }
      } catch (error) {
        showToast("삭제에 실패했습니다.");
      }
    }
  };

  // 저장하기
  const handleSave = async () => {
    try {
      const newTracks = editedList.filter(
        (editedTrack) =>
          !originalList.some(
            (originalTrack) =>
              originalTrack.spotifyTrackSeq === editedTrack.spotifyTrackSeq
          )
      );

      if (newTracks.length === 0) {
        showToast("변경사항이 없습니다.");
        return;
      }

      const tracksToAdd = newTracks.map((track, index) => ({
        spotifyTrackSeq: track.spotifyTrackSeq,
        spotifyTrackId: track.spotifyTrackId,
        name: track.name,
        imageList: track.imageList,
        trackArtistNameList: track.trackArtistNameList,
        rank:
          editedList.findIndex(
            (t) => t.spotifyTrackSeq === track.spotifyTrackSeq
          ) + 1,
      }));

      const result = await dispatch(addMyAllTimeTrack(tracksToAdd));

      if (addMyAllTimeTrack.fulfilled.match(result)) {
        showToast("신규 트랙이 저장되었습니다!", "success");

        await dispatch(fetchMyAllTimeHits());
        navigate("/mypage");
      } else {
        throw new Error("저장 실패");
      }
    } catch (error) {
      showToast("저장에 실패했습니다.");
    }
  };

  const handleGoBack = () => {
    if (myAllTimeState.isDirty) {
      if (
        window.confirm("변경사항이 저장되지 않았습니다. 그래도 나가시겠습니까?")
      ) {
        dispatch(resetState());
        navigate("/mypage");
      }
    } else {
      dispatch(resetState());
      navigate("/mypage");
    }
  };

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center relative  md:px-[20%] items-center">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute md:left-[20%] left-4 "
          onClick={handleGoBack}
        />
        <h1 className="font-bold text-lg ">My All-Time Hits</h1>
      </header>
      <main className="p-4 md:px-[20%]">
        <div className="md:flex md:justify-between md:items-center md:py-2">
          <div className="flex flex-col text-sm md:text-base font-semibold text-text-base mb-4">
            <p>
              <span className="text-purple-950 font-bold">
                {userNickname}님이 가장 사랑하는 곡
              </span>
              을 모아둔 공간이에요.
            </p>
            <p>
              언제든 자유롭게 업데이트하세요!
              <span className="text-xs text-white md:text-sm">
                {" "}
                (최대 10곡)
              </span>
            </p>
          </div>
          <div className="mb-2 md:mb-0">
            <RegisterButton onClick={() => navigate("/my-hits-search")}>
              곡 추가하기
            </RegisterButton>
          </div>
        </div>
        <section>
          <h2 className="sr-only">나의 All time hits 목록</h2>
          <div className="w-full rounded-lg shadow-2xl p-4 pb-6 md:px-[50px] md:py-6 border border-bg-peach">
            {Array.isArray(editedList) && editedList.length > 0 && !loading
              ? editedList.map((song, index) => (
                  <article
                    key={song.spotifyTrackSeq}
                    className="border-b border-b-accent flex items-center gap-3 py-3 pr-10 relative cursor-pointer"
                  >
                    <Checkbox
                      type="circle"
                      checked={deletedTracks.includes(song.spotifyTrackSeq)}
                      onChange={(isChecked) =>
                        handleCheckboxChange(song.spotifyTrackSeq, isChecked)
                      }
                    />
                    <p className="text-bg-peach">{index + 1}</p>
                    <div className="flex gap-3 items-center flex-1 min-w-0">
                      <img
                        src={
                          song.imageList[0]?.url
                            ? song.imageList[0]?.url
                            : sample
                        }
                        alt={song.name}
                        className="w-[50px] h-[50px] rounded-sm shrink-0"
                      />
                      <div className="flex flex-col gap-1 overflow-hidden w-full">
                        <h3 className="font-bold text-sm truncate w-full">
                          {song.name}
                        </h3>
                        <p className="text-xs text-[#333] truncate w-full">
                          {song.trackArtistNameList.join(",") || "알 수 없음"}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              : !loading && (
                  <p className="text-center text-sm text-bg-peach py-20">
                    곡 목록이 없습니다.
                  </p>
                )}
          </div>
        </section>
        <div className="mt-4 mb-7 flex justify-between">
          <button
            className="text-sm px-4 py-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDeleteSelected}
            disabled={deletedTracks.length === 0}
          >
            삭제 ({deletedTracks.length})
          </button>
          <Button size="md" onClick={handleSave}>
            저장하기
          </Button>
        </div>
      </main>
    </>
  );
}
