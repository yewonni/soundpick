import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import prevIcon from "../../images/chevron-left.svg";
import starOff from "../../images/star-off.svg";
import starOn from "../../images/star-on.svg";
import Button from "../../components/Button";
import reviewIcon from "../../images/review-icon.svg";
import Header from "../../components/Header";

export default function Review() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleStarClick = (index: number) => {
    setRating(index + 1);
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
                <Button default>등록하기</Button>
              </div>
            </div>
          </section>

          <section className="mt-6 md:mt-8">
            <h2 className="sr-only">댓글 목록 보기</h2>
            <div className="flex gap-1 items-center mb-2  font-semibold">
              <img src={reviewIcon} alt="댓글" />
              <p className="cursor-pointer">11,264</p>
            </div>

            {/* 댓글 목록 */}
            <div className="flex flex-col gap-2 md:gap-4">
              {[1, 2].map((item) => (
                <article
                  key={item}
                  className="bg-white/50 backdrop-blur-md border border-white/30 text-sm text-[#333] rounded-md p-3 md:flex md:items-start md:justify-between md:gap-6 md:p-4 md:rounded-lg"
                >
                  <div className="mb-2 md:mb-0 md:w-1/3">
                    <p className="font-bold mb-1">작성자</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src={starOff}
                          alt="별점"
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3">댓글내용</div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
