import { useNavigate } from "react-router-dom";
import { useState } from "react";
import likeBtn from "../../../images/like-icon.svg";
import reviewBtn from "../../../images/review-icon.svg";
import { useAuth } from "../../../context/AuthContext";
import LoginModal from "../../../components/LoginModal";

export default function LikeAndComment({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
    }
  };

  const handleComment = () => {
    if (!isLoggedIn) {
      setIsOpenLoginModal(true);
    } else {
      navigate("/review");
    }
  };

  const handleClose = () => {
    setIsOpenLoginModal(false);
  };

  return (
    <>
      {!isMobile && (
        <div className="hidden md:flex gap-4 items-center text-sm font-semibold mt-8">
          <div className="flex gap-1 items-center">
            <img
              src={likeBtn}
              alt="좋아요"
              className="cursor-pointer"
              onClick={handleLike}
            />
            <p>21,089</p>
          </div>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleComment}
          >
            <img src={reviewBtn} alt="댓글" />
            <p className="hover:underline">11,264</p>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="flex gap-4 items-center text-sm  font-semibold md:hidden">
          <div className="flex gap-1 items-center">
            <img
              src={likeBtn}
              alt="좋아요"
              className="cursor-pointer"
              onClick={handleLike}
            />
            <p>21,089</p>
          </div>
          <div className="flex gap-1 items-center " onClick={handleComment}>
            <img src={reviewBtn} alt="댓글" className="cursor-pointer" />
            <p className="cursor-pointer">11,264</p>
          </div>
        </div>
      )}
      <LoginModal isOpen={isOpenLoginModal} onClose={handleClose} />
    </>
  );
}
