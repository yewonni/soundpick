import { useEffect, useState } from "react";
import prevIcon from "../../images/chevron-left.svg";
import { useNavigate } from "react-router-dom";
import sample from "../../images/music-cat-full.png";
import chatIcon from "../../images/chat-icon.svg";
import { getFollowingList, Following } from "../../api/myPage/friends";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../context/LoadingContext";

export default function MyFriends() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  const [following, setFollowing] = useState<Following[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchFollowingList = async (page: number) => {
    try {
      const res = await getFollowingList(page - 1);
      setFollowing(res.data.data.content);
      setCurrentPage(res.data.data.number + 1);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("팔로잉 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchFollowingList(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchFollowingList(page);
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
        <h1 className="font-bold text-lg">나의 음악 친구</h1>
      </header>
      <main className="w-full min-h-screen bg-bg-peach p-4 md:px-[20%]">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-primary py-1 border-b border-b-bg-secondary">
            총 {following.length}명
          </p>
          <button
            className="text-sm px-3 py-1 rounded-full bg-primary text-white hover:brightness-110"
            onClick={() => navigate("/find-friends")}
          >
            새로운 친구 찾기
          </button>
        </div>

        {!loading && following.length === 0 ? (
          <div className="text-center text-[#666] mt-20">
            아직 팔로우한 친구가 없어요.
            <br />
            마음에 드는 음악 친구를 찾아보세요!
          </div>
        ) : (
          <>
            {following.map((user, index) => (
              <article
                key={index}
                className="flex justify-between items-center py-3 mt-2 md:hover:bg-gray-100 px-2"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={user?.imageUrl ? `${baseUrl}${user.imageUrl}` : sample}
                    alt="프로필 이미지"
                    className="w-[50px] h-[50px] rounded-full cursor-pointer object-cover"
                  />
                  <p className="font-bold text-sm cursor-pointer hover:underline">
                    {user.followMemberNickname}
                  </p>
                </div>
                <img
                  src={chatIcon}
                  alt="채팅 아이콘"
                  className="cursor-pointer"
                />
              </article>
            ))}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}
