import React from "react";
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search-result" element={<SearchResult />}></Route>
        <Route path="/playlist-details" element={<PlaylistDetails />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/join/success" element={<JoinSuccess />}></Route>
        <Route path="/music-analysis" element={<MusicAnalysis />}></Route>
        <Route path="/search-artist" element={<ArtistSearch />}></Route>
        <Route path="/recommendation" element={<Recommendation />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/my-hits" element={<MyAllTimeHits />}></Route>
        <Route path="/my-playlist" element={<MyPlaylist />}></Route>
        <Route
          path="/my-playlist-details"
          element={<MyPlaylistDetails />}
        ></Route>
        <Route path="/register-playlist" element={<RegisterPlaylist />}></Route>
        <Route path="/liked-playlist" element={<LikedPlaylists />}></Route>
        <Route
          path="/liked-playlist-details"
          element={<LikedPlaylistDetails />}
        ></Route>
        <Route path="/my-review" element={<MyReview />}></Route>
        <Route path="/my-friends" element={<MyFriends />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
