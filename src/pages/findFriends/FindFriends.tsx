import { useNavigate } from "react-router-dom";
import prevIcon from "../../images/chevron-left.svg";
import SearchBar from "../../components/SearchBar";
import {
  searchFriends,
  followFriend,
  unfollowFriend,
} from "../../api/myPage/friends";
import { useState } from "react";
import sampleImg from "../../images/music-cat-full.png";
import { useLoading } from "../../context/LoadingContext";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  follow,
  unfollow,
  setFriends,
  setCurrentPage,
  setTotalPages,
} from "../../store/followSlice";

export default function FindFriends() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  const [query, setQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.follow.friends);
  const currentPage = useSelector(
    (state: RootState) => state.follow.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.follow.totalPages);

  // 친구 검색
  const handleSearch = async (page = 0) => {
    try {
      setIsSearched(true);
      const response = await searchFriends(page, 10, query);
      dispatch(setFriends(response.data.data.content));
      dispatch(setCurrentPage(response.data.data.number));
      dispatch(setTotalPages(response.data.data.totalPages));
    } catch (error) {
      setError("검색에 실패했습니다");
      dispatch(setFriends([]));
      dispatch(setCurrentPage(0));
      dispatch(setTotalPages(0));
    }
  };

  // 팔로우, 언팔로우
  const handleFollowToggle = async (memberSeq: string, followed: boolean) => {
    try {
      if (followed) {
        await unfollowFriend({ followMemberSeq: memberSeq });
        dispatch(unfollow(memberSeq));
      } else {
        await followFriend(memberSeq);
        dispatch(follow(memberSeq));
      }
    } catch (error) {
      console.error("팔로우/언팔로우 실패:", error);
      alert("요청에 실패했어요. 다시 시도해주세요.");
    }
  };

  const handlePageChange = (page: number) => {
    handleSearch(page);
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
        <h1 className="font-bold text-lg">새로운 친구 찾기</h1>
      </header>

      <main className="w-full min-h-screen p-4 md:px-[20%]">
        <SearchBar
          placeholderText="친구의 닉네임을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={() => handleSearch(0)}
        />

        <p className="font-bold text-primary mt-6 border-b border-b-primary pb-1">
          검색 결과
        </p>

        {!isSearched ? (
          <div className="flex flex-col gap-1 items-center justify-center text-secondary mt-20">
            <img src={sampleImg} alt="샘플 이미지" className="w-24 h-24 mb-4" />
            <p>찾고 싶은 친구를 검색해보세요!</p>
            <p>검색 결과는 여기에 표시됩니다</p>
            {error && <p>검색에 실패했습니다.</p>}
          </div>
        ) : !loading && friends.length === 0 ? (
          <div className="flex flex-col gap-1 text-secondary mt-20 items-center ">
            <p>검색 결과가 없습니다.</p>
            <p>다른 키워드로 검색해보세요!</p>
          </div>
        ) : (
          friends.map((user) => (
            <article
              key={user.memberSeq}
              className="flex justify-between items-center py-3 mt-2 md:hover:bg-accent px-2"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={
                    user?.imageUrl ? `${baseUrl}${user.imageUrl}` : sampleImg
                  }
                  alt="프로필 이미지"
                  className="w-[50px] h-[50px] rounded-full cursor-pointer object-cover"
                />
                <p className="font-bold text-sm cursor-pointer hover:underline">
                  {user.nickname}
                </p>
              </div>
              <button
                onClick={() =>
                  handleFollowToggle(user.memberSeq, user.followed)
                }
                className={`text-sm px-3 py-1 rounded-full ${
                  user.followed
                    ? "bg-secondary text-primary hover:brightness-95"
                    : "bg-primary text-white hover:brightness-110"
                }`}
              >
                {user.followed ? "unfollow" : "follow"}
              </button>
            </article>
          ))
        )}

        {isSearched && totalPages > 1 && (
          <Pagination
            currentPage={currentPage + 1}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(page - 1)}
          />
        )}
      </main>
    </>
  );
}
