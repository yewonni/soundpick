import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Search from "./pages/search/Search";
import SearchResult from "./pages/searchResult/SearchResult";
import PlaylistDetails from "./pages/playlistDetails/PlaylistDetails";
import Login from "./pages/login/Login";
import Join from "./pages/join/Join";
import JoinSuccess from "./pages/join/JoinSuccess";
import MusicAnalysis from "./pages/ musicAnalysis/ MusicSurvey";
import ArtistSearch from "./pages/ musicAnalysis/component/ArtistSearch";
import Recommendation from "./pages/ musicAnalysis/component/Recommendation";
import Review from "./pages/review/Review";
import MyPage from "./pages/myPage/MyPage";
import MyAllTimeHits from "./pages/myPage/component/MyAllTimeHits";
import MyPlaylist from "./pages/myPage/component/MyPlaylist";
import MyPlaylistDetails from "./pages/myPlaylistDetails/MyPlaylistDetails";
import LikedPlaylists from "./pages/myPage/component/LikedPlaylists";
import LikedPlaylistDetails from "./pages/likedPlaylistDetails/LikedPlaylistDetails";
import ErrorPage from "./pages/404error/ErrorPage";
import RegisterPlaylist from "./pages/registerPlaylist/RegisterPlaylist";
import MyReview from "./pages/myReview/MyReview";
import MyFriends from "./pages/myFriends/MyFriends";
import EditProfile from "./pages/editProfile/EditProfile";
import PopularArtistsPage from "./pages/popularArtists/PopularArtistsPage";
import RecommendedPlaylistsPage from "./pages/recommendedPlaylists/RecommendedPlaylistsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { injectSetAccessToken } from "./api/axiosInstance";
import { SearchProvider } from "./context/SearchContext";
import { AnalysisResultProvider } from "./context/AnalysisResultContext";
// import PrivateRoute from "./components/PrivateRouter";
import axiosInstance, {
  RefreshResponse,
  injectSetLoading,
} from "./api/axiosInstance";
import Loader from "./components/Loader";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <SearchProvider>
          <AnalysisResultProvider>
            <BrowserRouter>
              <AppInitializer />
              <AppContent />
            </BrowserRouter>
          </AnalysisResultProvider>
        </SearchProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

function AppContent() {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular-artists" element={<PopularArtistsPage />} />
        <Route
          path="/recommended-playlists"
          element={<RecommendedPlaylistsPage />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/playlist-details" element={<PlaylistDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/join-success" element={<JoinSuccess />} />
        {/* PrivateRoute로 보호된 라우트들 */}
        <Route path="/review" element={<Review />} />
        <Route path="/music-analysis" element={<MusicAnalysis />} />
        <Route path="/search-artist" element={<ArtistSearch />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-hits" element={<MyAllTimeHits />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route path="/my-playlist-details" element={<MyPlaylistDetails />} />
        <Route path="/register-playlist" element={<RegisterPlaylist />} />
        <Route path="/liked-playlist" element={<LikedPlaylists />} />
        <Route
          path="/liked-playlist-details"
          element={<LikedPlaylistDetails />}
        />
        <Route path="/my-review" element={<MyReview />} />
        <Route path="/my-friends" element={<MyFriends />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

function AppInitializer() {
  const {
    setAccessToken,
    setIsLoggedIn,
    setPreferenceAnalyzed,
    preferenceAnalyzed,
  } = useAuth();
  const { setLoading } = useLoading(); // useLoading 훅 사용

  useEffect(() => {
    // axiosInstance에 setAccessToken 함수 주입
    injectSetAccessToken(setAccessToken);

    // axiosInstance에 setLoading 함수 주입
    injectSetLoading(setLoading);

    // 페이지 로드 시 자동으로 토큰 갱신 시도
    async function verifyTokenOnLoad() {
      try {
        // 저장된 토큰이 있는지 검증하는 API 호출
        const res = await axiosInstance.post<RefreshResponse>(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;
        const updatedPreference = res.data.meta.preferenceAnalyzed;

        // 새 토큰으로 헤더 업데이트
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // AuthContext 상태 업데이트
        setAccessToken(newAccessToken);
        setIsLoggedIn(true);
        setPreferenceAnalyzed(updatedPreference);
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        // 현재 위치가 로그인 페이지가 아닐 때만 리다이렉트
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    // 로그인 페이지나 회원가입 페이지에서는 실행 안 함
    const skipPaths = ["/login", "/join"];
    if (!skipPaths.includes(window.location.pathname)) {
      verifyTokenOnLoad();
    }
  }, [
    setAccessToken,
    setIsLoggedIn,
    setLoading,
    setPreferenceAnalyzed,
    preferenceAnalyzed,
  ]);

  return null;
}

export default App;
