import axiosInstance from "../axiosInstance";

export interface MyPreferenceType {
  genreList: string[];
  artistList: string[];
}

export interface AnalysisResultType {
  data: {
    artistList: [
      {
        spotifyArtistId: string;
        recommendArtistSeq: string;
        name: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
    trackList: [
      {
        spotifyTrackId: string;
        recommendTrackSeq: string;
        name: string;
        trackArtists: [
          {
            name: string;
          }
        ];
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

// 취향 분석 단계 - 선택
export const myPreference = (data: MyPreferenceType) => {
  return axiosInstance.post<AnalysisResultType>(
    "/api/spotify/recommendation/user",
    data
  );
};

// 곡 추천 결과 수정(추가)
interface EditTrackType {
  spotifyTrackSeq: string;
}
export const editTrackList = (data: EditTrackType[]) => {
  return axiosInstance.post("/api/spotify/recommendation/track", data);
};

// 곡 추천 결과 삭제
interface DeleteTrackType {
  recommendTrackSeq: string;
}

export const deleteTrack = (data: DeleteTrackType[]) => {
  return axiosInstance.request({
    url: "/api/spotify/recommendation/track",
    method: "delete",
    data,
  });
};

// 아티스트 결과 수정(추가)
interface EditArtistType {
  spotifyArtistSeq: string;
}
export const editArtistList = (data: EditArtistType[]) => {
  return axiosInstance.post("/api/spotify/recommendation/artist", data);
};

// 아티스트 추천 결과 삭제
interface DeleteArtistType {
  recommendArtistSeq: string;
}

export const deleteArtist = (data: DeleteArtistType[]) => {
  return axiosInstance.request({
    url: "/api/spotify/recommendation/artist",
    method: "delete",
    data,
  });
};
