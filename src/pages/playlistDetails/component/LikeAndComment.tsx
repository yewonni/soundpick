import { useNavigate } from "react-router-dom";
import likeBtn from "../../../images/like-icon.svg";
import reviewBtn from "../../../images/review-icon.svg";
export default function LikeAndComment({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();
  return (
    <>
      {!isMobile && (
        <div className="hidden md:flex gap-4 items-center text-sm font-semibold mt-8">
          <div className="flex gap-1 items-center">
            <img src={likeBtn} alt="좋아요" className="cursor-pointer" />
            <p>21,089</p>
          </div>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => navigate("/review")}
          >
            <img src={reviewBtn} alt="댓글" />
            <p className="hover:underline">11,264</p>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="flex gap-4 items-center text-sm  font-semibold md:hidden">
          <div className="flex gap-1 items-center">
            <img src={likeBtn} alt="좋아요" className="cursor-pointer" />
            <p>21,089</p>
          </div>
          <div
            className="flex gap-1 items-center "
            onClick={() => navigate("/review")}
          >
            <img src={reviewBtn} alt="댓글" className="cursor-pointer " />
            <p className="cursor-pointer">11,264</p>
          </div>
        </div>
      )}
    </>
  );
}
