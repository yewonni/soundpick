import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/index";
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
import EditArtistSearch from "./pages/ musicAnalysis/component/EditArtistSearch";
import EditTrackSearch from "./pages/ musicAnalysis/component/EditTrackSearch";
import Review from "./pages/review/Review";
import MyPage from "./pages/myPage/MyPage";
import MyAllTimeHits from "./pages/myPage/component/MyAllTimeHits";
import MyAllTimeTrackSearch from "./pages/myPage/component/MyAllTimeTrackSearch";
import MyPlaylist from "./pages/myPage/component/MyPlaylist";
import MyPlaylistDetails from "./pages/myPlaylistDetails/MyPlaylistDetails";
import LikedPlaylists from "./pages/myPage/component/LikedPlaylists";
import ErrorPage from "./pages/404error/ErrorPage";
import RegisterPlaylist from "./pages/registerPlaylist/RegisterPlaylist";
import MyReview from "./pages/myReview/MyReview";
import MyFriends from "./pages/myFriends/MyFriends";
import FindFriends from "./pages/findFriends/FindFriends";
import EditProfile from "./pages/editProfile/EditProfile";
import PopularArtistsPage from "./pages/popularArtists/PopularArtistsPage";
import PopularPlaylistsPage from "./pages/popularPlaylists/PopularPlaylistsPage";
import RecommendedPlaylistPage from "./pages/recommendedPlaylist/RecommendedPlaylistPage";
import RecommendedTrackPage from "./pages/recommendedTrack/RecommendedTrackPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { injectSetAccessToken } from "./api/axiosInstance";
import { SearchProvider } from "./context/SearchContext";
import { AnalysisResultProvider } from "./context/AnalysisResultContext";
import { TrackSelectionProvider } from "./context/TrackSelectionContext";
import { ArtistSelectionProvider } from "./context/ArtistSelectionContext";
import { ArtistAnalysisProvider } from "./context/ArtistAnalysisContext";
// import PrivateRoute from "./components/PrivateRouter";
import axiosInstance, {
  RefreshResponse,
  injectSetLoading,
} from "./api/axiosInstance";
import Loader from "./components/Loader";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LoadingProvider>
          <SearchProvider>
            <AnalysisResultProvider>
              <TrackSelectionProvider>
                <ArtistSelectionProvider>
                  <ArtistAnalysisProvider>
                    <BrowserRouter>
                      <AppInitializer />
                      <AppContent />
                    </BrowserRouter>
                  </ArtistAnalysisProvider>
                </ArtistSelectionProvider>
              </TrackSelectionProvider>
            </AnalysisResultProvider>
          </SearchProvider>
        </LoadingProvider>
      </AuthProvider>
    </Provider>
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
        <Route path="/popular-playlists" element={<PopularPlaylistsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/join-success" element={<JoinSuccess />} />
        <Route path="/*" element={<ErrorPage />} />
        {/* PrivateRoute로 보호된 라우트들 */}
        <Route
          path="/recommended-playlists"
          element={<RecommendedPlaylistPage />}
        />
        <Route path="/recommended-tracks" element={<RecommendedTrackPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/playlist-details/:seq" element={<PlaylistDetails />} />
        <Route path="/review/:spotifyPlaylistSeq" element={<Review />} />
        <Route path="/music-analysis" element={<MusicAnalysis />} />
        <Route path="/search-artist" element={<ArtistSearch />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/edit-artist" element={<EditArtistSearch />} />
        <Route path="/edit-track" element={<EditTrackSearch />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/my-hits" element={<MyAllTimeHits />} />
        <Route path="/my-hits-search" element={<MyAllTimeTrackSearch />} />
        <Route path="/my-playlist" element={<MyPlaylist />} />
        <Route
          path="/my-playlist-details/:seq"
          element={<MyPlaylistDetails />}
        />
        <Route path="/register-playlist" element={<RegisterPlaylist />} />
        <Route path="/liked-playlist" element={<LikedPlaylists />} />
        <Route path="/my-review" element={<MyReview />} />
        <Route path="/my-friends" element={<MyFriends />} />
        <Route path="/find-friends" element={<FindFriends />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

function AppInitializer() {
  const { setAccessToken, setIsLoggedIn, setHasInitialized, setUserNickname } =
    useAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    // axiosInstance에 setAccessToken 함수 주입
    injectSetAccessToken(setAccessToken);

    // axiosInstance에 setLoading 함수 주입
    injectSetLoading(setLoading);

    // 페이지 로드 시 자동으로 토큰 갱신 시도
    let isVerifying = false;

    async function verifyTokenOnLoad() {
      if (isVerifying) return;
      isVerifying = true;

      try {
        const res = await axiosInstance.post<RefreshResponse>(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.data.accessToken;
        const updatedUserNickname = res.data.data.nickname;

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        setAccessToken(newAccessToken);
        setIsLoggedIn(true);
        setUserNickname(updatedUserNickname);
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } finally {
        isVerifying = false;
        setHasInitialized(true);
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
    setUserNickname,
    setHasInitialized,
  ]);

  return null;
}

export default App;
