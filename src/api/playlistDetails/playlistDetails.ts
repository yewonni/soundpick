import axiosInstance from "../axiosInstance";

interface PlaylistDetailsResponse {
  data: {
    spotifyPlaylistSeq: string;
    spotifyPlaylistId: string;
    name: string;
    description: string;
    owner: string;
    likeCount: number;
    reviewCount: number;
    like: boolean;
    imageList: [
      {
        url: string;
      }
    ];
  };
}

export const getPlaylistDetails = (seq: string) => {
  return axiosInstance.get<PlaylistDetailsResponse>(
    `/api/spotify/playlist/${seq}`
  );
};

export interface Track {
  playlistTrackSeq: string;
  spotifyPlaylistSeq: string;
  spotifyTrackSeq: string;
  spotifyTrackId: string;
  spotifyPlaylistId: string;
  name: string;
  trackArtists: { name: string }[];
  imageList: { url: string }[];
}

interface PlaylistTracksResponse {
  data: Track[];
}

export const getPlaylistTracks = (seq: string) => {
  return axiosInstance.get<PlaylistTracksResponse>(
    `/api/spotify/playlist/${seq}/tracks`
  );
};

export const likePlaylist = (spotifyPlaylistSeq: string) => {
  return axiosInstance.post("/api/member-preference/playlist", {
    spotifyPlaylistSeq,
  });
};

interface DeleteLikeType {
  spotifyPlaylistSeq: string;
}

export const deleteLike = (data: DeleteLikeType[]) => {
  return axiosInstance.request({
    url: "/api/member-preference/playlist",
    method: "delete",
    data,
  });
};
