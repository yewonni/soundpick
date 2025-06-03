import axiosInstance from "../axiosInstance";

interface MyPlaylistRequest {
  name: string;
  description: string;
}

interface MyPlaylistResponse {
  data: {
    content: [
      {
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
export const editMyPlaylist = (data: MyPlaylistRequest) => {
  return axiosInstance.put("/api/spotify/playlist", data);
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
  spotifyPlaylistId: string
) => {
  return axiosInstance.request({
    url: `/api/spotify/playlist/${spotifyPlaylistId}`,
    method: "delete",
    data,
  });
};
