import PlaylistDetails from "../playlistDetails/PlaylistDetails";
export default function LikedPlaylistDetails() {
  return (
    <>
      <PlaylistDetails />
    </>
  );
}
//나중에 API 연결 시 PlaylistDetails 페이지로, 좋아요 상태 가져와서 이동하기 (이때 PlaylistDetails 헤더는 조건부 랜더링으로 변경 : 내가 좋아한 플레이리스트)
