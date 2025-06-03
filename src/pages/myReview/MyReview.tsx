import { useEffect, useState } from "react";
import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../images/music-cat-full.png";
import starOff from "../../images/star-off.svg";
import starOn from "../../images/star-on.svg";
import Button from "../../components/Button";
import { getMyReview } from "../../api/myPage/review";
import { useAppDispatch } from "../../store/hooks";
import { deleteComments } from "../../store/commentsSlice";
import { useLoading } from "../../context/LoadingContext";

interface ReviewItem {
  seq: string;
  spotifyPlaylistSeq: string;
  memberSeq: string;
  content: string;
  star: number;
  nickname: string;
  owner: string;
  playlistName: string;
  imageList: [
    {
      url: string;
    }
  ];
}

export default function MyReview() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useLoading();
  const [reviewData, setReviewData] = useState<ReviewItem[]>([]);

  const fetchMyReview = async () => {
    try {
      const res = await getMyReview();
      setReviewData(res.data.data.content);
    } catch (error) {
      console.log("리뷰 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchMyReview();
  }, []);

  const handleDelete = async (spotifyPlaylistSeq: string, seq: string) => {
    const ok = window.confirm("정말 삭제하시겠어요?");
    if (!ok) return;

    try {
      await dispatch(deleteComments({ spotifyPlaylistSeq, seq })).unwrap();
      await fetchMyReview();
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <header className="p-4 bg-bg-sub flex justify-center items-center relative md:px-[20%]">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="cursor-pointer absolute left-4 md:left-[20%]"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-lg ">내가 남긴 한 마디</h1>
      </header>
      <main className="w-full min-h-screen bg-bg-peach p-4 md:px-[20%]">
        <p className="font-bold text-primary py-1 border-b border-b-bg-secondary">
          총 {reviewData.length}개
        </p>

        {!loading && reviewData.length === 0 ? (
          <p className="text-center text-[#666] mt-20">
            아직 남긴 리뷰가 없습니다.
          </p>
        ) : (
          reviewData.map((data, index) => (
            <section key={index} className="py-5 ">
              <h2 className="sr-only">리뷰 상세 내용</h2>
              <article className="flex gap-3">
                <img
                  onClick={() =>
                    navigate(`/playlist-details/${data.spotifyPlaylistSeq}`)
                  }
                  src={data.imageList[0]?.url ? data.imageList[0]?.url : sample}
                  alt=""
                  className="w-[60px] h-[60px] rounded-sm hover:cursor-pointer "
                />
                <div className="flex flex-col gap-1">
                  <h3
                    onClick={() =>
                      navigate(`/playlist-details/${data.spotifyPlaylistSeq}`)
                    }
                    className="font-bold text-md hover:cursor-pointer hover:underline "
                  >
                    {data.playlistName}
                  </h3>
                  <p className="text-[#333] text-sm">by {data.owner}</p>
                </div>
              </article>
              <article>
                <div className="flex justify-between mt-1">
                  <div className="flex gap-1 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={i < data.star ? starOn : starOff}
                        alt="별점"
                        className="w-4 h-4"
                      />
                    ))}
                  </div>
                  <Button
                    onClick={() =>
                      handleDelete(data.spotifyPlaylistSeq, data.seq)
                    }
                    default
                    size="sm"
                  >
                    삭제하기
                  </Button>
                </div>
                <div className="bg-gray-100 w-full p-4 rounded-md mt-3 text-[#333] text-sm">
                  {data.content}
                </div>
              </article>
            </section>
          ))
        )}
      </main>
    </>
  );
}
