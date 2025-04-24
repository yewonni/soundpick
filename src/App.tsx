import React, { useEffect } from "react";
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
import PrivateRoute from "./components/PrivateRouter";
import axiosInstance, { RefreshResponse } from "./api/axiosInstance";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppInitializer />
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
          <Route
            path="/review"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />
          <Route
            path="/music-analysis"
            element={
              <PrivateRoute>
                <MusicAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/search-artist"
            element={
              <PrivateRoute>
                <ArtistSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommendation"
            element={
              <PrivateRoute>
                <Recommendation />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-hits"
            element={
              <PrivateRoute>
                <MyAllTimeHits />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-playlist"
            element={
              <PrivateRoute>
                <MyPlaylist />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-playlist-details"
            element={
              <PrivateRoute>
                <MyPlaylistDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/register-playlist"
            element={
              <PrivateRoute>
                <RegisterPlaylist />
              </PrivateRoute>
            }
          />
          <Route
            path="/liked-playlist"
            element={
              <PrivateRoute>
                <LikedPlaylists />
              </PrivateRoute>
            }
          />
          <Route
            path="/liked-playlist-details"
            element={
              <PrivateRoute>
                <LikedPlaylistDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-review"
            element={
              <PrivateRoute>
                <MyReview />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-friends"
            element={
              <PrivateRoute>
                <MyFriends />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

function AppInitializer() {
  const { setAccessToken, setIsLoggedIn } = useAuth();

  useEffect(() => {
    // axiosInstance에 setAccessToken 함수 주입
    injectSetAccessToken(setAccessToken);

    // 페이지 로드 시 자동으로 토큰 갱신 시도
    async function verifyTokenOnLoad() {
      try {
        // 저장된 토큰이 있는지 검증하는 API 호출
        const res = await axiosInstance.post<RefreshResponse>(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.refreshToken;

        // 새 토큰으로 헤더 업데이트
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // AuthContext 상태 업데이트
        setAccessToken(newAccessToken);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        // 실패 시 별도 처리 없음 - 사용자는 로그인 페이지로 이동해야 함
      }
    }

    verifyTokenOnLoad();
  }, [setAccessToken, setIsLoggedIn]);

  return null;
}

export default App;
