import axiosInstance from "../axiosInstance";

interface MyReviewResponse {
  data: {
    content: [
      {
        seq: string;
        spotifyPlaylistSeq: string;
        memberSeq: string;
        content: string;
        star: number;
        nickname: string;
        owner: string;
        playlistName: string;
        imageList: [
          {
            url: string;
          }
        ];
      }
    ];
  };
}

export const getMyReview = () => {
  return axiosInstance.get<MyReviewResponse>("/api/playlist/reviews/me");
};
