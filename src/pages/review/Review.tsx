import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addComments,
  fetchComments,
  editComments,
  deleteComments,
} from "../../store/commentsSlice";

import logo from "../../images/logo.svg";
import prevIcon from "../../images/chevron-left.svg";
import starOff from "../../images/star-off.svg";
import starOn from "../../images/star-on.svg";
import Button from "../../components/Button";
import reviewIcon from "../../images/review-icon.svg";
import Header from "../../components/Header";

export default function Review() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { spotifyPlaylistSeq } = useParams<{ spotifyPlaylistSeq: string }>();
  const { comments, error } = useAppSelector((state) => state.comments);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  // 수정 상태
  const [editingSeq, setEditingSeq] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<string>("");
  const [editRating, setEditRating] = useState<number>(0);

  // 댓글 목록 처음에 불러오기
  useEffect(() => {
    if (!spotifyPlaylistSeq) return;
    dispatch(fetchComments({ page: 0, size: 10, spotifyPlaylistSeq }));
  }, [dispatch, spotifyPlaylistSeq]);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    console.log("버튼 클릭됨");
    if (!spotifyPlaylistSeq) {
      console.log("spotifyPlaylistSeq 없음");
      return;
    }
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      await dispatch(
        addComments({
          spotifyPlaylistSeq,
          content: comment,
          star: rating,
        })
      ).unwrap();

      await dispatch(fetchComments({ page: 0, size: 10, spotifyPlaylistSeq }));

      setComment("");
      setRating(0);
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleDelete = async (seq: string) => {
    if (!spotifyPlaylistSeq) return;
    const ok = window.confirm("정말 삭제하시겠어요?");
    if (!ok) return;

    try {
      await dispatch(deleteComments({ spotifyPlaylistSeq, seq })).unwrap();
      await dispatch(fetchComments({ page: 0, size: 10, spotifyPlaylistSeq }));
    } catch {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleEditStart = (c: (typeof comments)[number]) => {
    setEditingSeq(c.seq);
    setEditComment(c.content);
    setEditRating(c.star);
  };

  const handleEditCancel = () => {
    setEditingSeq(null);
    setEditComment("");
    setEditRating(0);
  };

  const handleEditSubmit = async () => {
    if (!spotifyPlaylistSeq || !editingSeq) return;
    if (editRating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      await dispatch(
        editComments({
          spotifyPlaylistSeq,
          seq: editingSeq,
          content: editComment,
          star: editRating,
        })
      ).unwrap();

      await dispatch(fetchComments({ page: 0, size: 10, spotifyPlaylistSeq }));
      handleEditCancel();
    } catch {
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>

      <header className="flex justify-center items-center px-4 py-2 h-[70px] relative md:hidden">
        <img
          src={prevIcon}
          alt="이전으로 가기"
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1>
          <img
            src={logo}
            alt="로고"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </h1>
      </header>

      <div className="w-full min-h-screen bg-bg-peach">
        <main className="p-4 md:px-[10.5%]">
          <section>
            <h2 className="sr-only">댓글 남기기</h2>

            <div className="bg-white/60 backdrop-blur-md border border-white/30 shadow-md rounded-xl p-4 md:p-6">
              <div className="md:flex md:gap-6">
                {/* 별점 */}
                <div className="mb-4 md:mb-0 md:w-1/3">
                  <p className="font-semibold mb-2 text-[#333]">
                    별점을 선택해주세요
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <img
                        key={index}
                        src={index < rating ? starOn : starOff}
                        alt="별점"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                        onClick={() => handleStarClick(index)}
                      />
                    ))}
                  </div>
                </div>

                {/* 감상평 */}
                <div className="relative md:w-2/3">
                  <textarea
                    className="w-full h-[100px] p-3 text-sm border border-gray-300 rounded-md bg-white resize-none text-[#333] focus:outline-none focus:ring-2 focus:ring-[#BFCBFF] focus:border-[#BFCBFF] transition md:h-[120px] md:text-base"
                    maxLength={20}
                    value={comment}
                    placeholder="자유롭게 감상평을 남겨주세요!"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <span className="absolute bottom-3 right-3 text-gray-400 text-sm">
                    {comment.length}/20
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button default onClick={handleSubmit}>
                  등록하기
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-8">
            <h2 className="sr-only">댓글 목록 보기</h2>
            <div className="flex gap-1 items-center mb-2 font-semibold">
              <img src={reviewIcon} alt="댓글" />
              <p className="cursor-pointer">
                {comments.length.toLocaleString()}
              </p>
            </div>
            {error && <p className="text-red-500">에러: {error}</p>}

            {/* 댓글 목록 */}
            <div className="flex flex-col gap-2 md:gap-4">
              {comments.map((c) => (
                <article
                  key={c.seq}
                  className="bg-white/50 backdrop-blur-md border border-white/30 text-sm text-[#333] rounded-md p-3 md:flex md:items-start md:justify-between md:gap-6 md:p-4 md:rounded-lg"
                >
                  <div className="mb-2 md:mb-0 md:w-1/3">
                    <p className="font-bold mb-1">{c.nickname}</p>
                    <div className="flex gap-1">
                      {(editingSeq === c.seq ? editRating : c.star) &&
                        Array.from({ length: 5 }).map((_, index) => (
                          <img
                            key={index}
                            src={
                              index <
                              (editingSeq === c.seq ? editRating : c.star)
                                ? starOn
                                : starOff
                            }
                            alt="별점"
                            className={`w-4 h-4 ${
                              editingSeq === c.seq
                                ? "cursor-pointer hover:scale-110"
                                : ""
                            }`}
                            onClick={() => {
                              if (editingSeq === c.seq)
                                setEditRating(index + 1);
                            }}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    {editingSeq === c.seq ? (
                      <>
                        <textarea
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className="w-full p-2 border rounded-md text-sm resize-none mb-2"
                          maxLength={20}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={handleEditCancel}
                          >
                            취소
                          </button>
                          <button
                            className="px-3 py-1 bg-primary text-white rounded hover:bg-active"
                            onClick={handleEditSubmit}
                          >
                            완료
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-2 whitespace-pre-wrap">{c.content}</p>
                        <div className="flex gap-2 justify-end">
                          <button
                            className={`text-xs text-blue-600 hover:underline ${
                              c.editable ? "block" : "hidden"
                            }`}
                            onClick={() => handleEditStart(c)}
                          >
                            수정
                          </button>

                          <button
                            className={`text-xs text-red-500 hover:underline ${
                              c.editable ? "block" : "hidden"
                            }`}
                            onClick={() => handleDelete(c.seq)}
                          >
                            삭제
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
