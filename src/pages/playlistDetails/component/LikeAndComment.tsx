import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import likeBtn from "../../../images/like-icon.svg";
import likeFull from "../../../images/likeFull.svg";
import reviewBtn from "../../../images/review-icon.svg";
import {
  likePlaylist,
  deleteLike,
} from "../../../api/playlistDetails/playlistDetails";
import LikePlaylistModal from "./LikePlaylistModal";
import { useLikeContext } from "../../../context/LIkeContext";
import { PlaylistData } from "../PlaylistDetails";

export default function LikeAndComment({
  isMobile,
  playlistSeq,
  playlistData,
}: {
  isMobile: boolean;
  playlistSeq: string | undefined;
  playlistData?: PlaylistData | null;
}) {
  const navigate = useNavigate();
  const [isOpenModal, setIsModalOpen] = useState(false);
  const { isLiked, likeCount, toggleLike } = useLikeContext();

  const handleLike = async () => {
    if (!playlistSeq) return;
    try {
      if (isLiked) {
        await deleteLike([{ spotifyPlaylistSeq: playlistSeq }]);
        toast.success("저장된 플레이리스트가 삭제되었습니다.");
      } else {
        await likePlaylist(playlistSeq);
        setIsModalOpen(true);
      }

      toggleLike();
    } catch (error) {
      toast.error("좋아요 실패");
    }
  };

  const handleComment = () => {
    if (playlistSeq) {
      navigate(`/review/${playlistSeq}`);
    }
  };

  return (
    <>
      <div
        className={`flex gap-4 items-center text-sm font-semibold ${
          isMobile ? "md:hidden" : "hidden md:flex mt-8"
        }`}
      >
        <div className="flex gap-1 items-center">
          <img
            src={isLiked ? likeFull : likeBtn}
            alt="좋아요"
            className="cursor-pointer"
            onClick={handleLike}
          />
          <p>{likeCount.toLocaleString()}</p>
        </div>
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={handleComment}
        >
          <img src={reviewBtn} alt="댓글" />
          <p className={`${!isMobile ? "hover:underline" : ""}`}>
            {playlistData?.reviewCount}
          </p>
        </div>
      </div>

      <LikePlaylistModal
        isOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
