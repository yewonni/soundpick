import axiosInstance from "../axiosInstance";

export interface MyPreferenceType {
  genreList: string[];
  artistList: string[];
}

export interface AnalysisResultType {
  data: {
    artistList: [
      {
        name: string;
        images: [
          {
            url: string;
          }
        ];
      }
    ];
    trackList: [
      {
        name: string;
        album: {
          name: string;
          images: [
            {
              url: string;
            }
          ];
        };
        artists: [
          {
            name: string;
          }
        ];
      }
    ];
  };
}

export const myPreference = (data: MyPreferenceType) => {
  return axiosInstance.post<AnalysisResultType>(
    "/api/spotify/recommendation/user",
    data
  );
};
