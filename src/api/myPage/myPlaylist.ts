import axiosInstance from "../axiosInstance";

interface MyPlaylistRequest {
  name: string;
  description: string;
}

interface MyPlaylistResponse {
  data: {
    content: [
      {
        memberPlaylistHistorySeq: string;
        spotifyPlaylistId: string;
        spotifyPlaylistSeq: string;
        name: string;
        description: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

// 플리 가져오기
export const getMyPlaylist = () => {
  return axiosInstance.get<MyPlaylistResponse>("/api/members/playlists/my");
};

// 플리 내용 등록
export const registerMyPlaylist = (data: MyPlaylistRequest) => {
  return axiosInstance.post("/api/spotify/playlist", data);
};

//플리 내용 수정
export const editMyPlaylist = (
  data: MyPlaylistRequest,
  spotifyPlaylistSeq: string
) => {
  return axiosInstance.put(`/api/spotify/playlist/${spotifyPlaylistSeq}`, data);
};

// 플리 이미지 등록
export const uploadMyPlaylistImage = (
  file: File,
  spotifyPlaylistId: string
) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(
    `/api/spotify/playlist/${spotifyPlaylistId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// 플리 삭제
interface DeleteMyPlaylist {
  memberPlaylistHistorySeq: string;
}
export const deleteMyPlaylist = (data: DeleteMyPlaylist[]) => {
  return axiosInstance.request({
    url: "/api/members/playlists",
    method: "delete",
    data,
  });
};

// 트랙 추가
interface AddPlaylistTracks {
  spotifyTrackId: string;
}
export const addPlaylistTrack = (
  data: AddPlaylistTracks[],
  spotifyPlaylistSeq: string
) => {
  return axiosInstance.post(
    `/api/spotify/playlist/${spotifyPlaylistSeq}/tracks`,
    data
  );
};

// 트랙 삭제
interface DeletePlaylistTracks {
  spotifyTrackId: string;
}
export const deletePlaylistTrack = (
  data: DeletePlaylistTracks[],
  spotifyPlaylistSeq: string
) => {
  return axiosInstance.request({
    url: `/api/spotify/playlist/${spotifyPlaylistSeq}/tracks`,
    method: "delete",
    data,
  });
};
