import axiosInstance from "../axiosInstance";

interface LikedPlaylistsResponse {
  data: {
    content: [
      {
        preferencePlaylistSeq: string;
        spotifyPlaylistSeq: string;
        spotifyPlaylistId: string;
        name: string;
        description: string;
        owner: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}
export const getLikedPlaylists = () => {
  return axiosInstance.get<LikedPlaylistsResponse>(
    "/api/member-preference/playlist"
  );
};
