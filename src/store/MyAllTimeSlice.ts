import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface MyAllTimeHits {
  preferenceTrackSeq?: string;
  spotifyTrackSeq: string;
  memberSeq?: string;
  rank: number;
  spotifyTrackId: string;
  name: string;
  imageList: [
    {
      url: string;
    }
  ];
  trackArtistNameList: string[];
}

interface Track {
  preferenceTrackSeq?: string;
  spotifyTrackSeq: string;
  spotifyTrackId: string;
  name: string;
  imageList: [
    {
      url: string;
    }
  ];
  rank: number;
  trackArtistNameList: string[];
}

interface MyAllTimeHitsState {
  originalList: Track[];
  editedList: Track[];
  loading: boolean;
  error: string | null;
  isDirty: boolean;
}

const initialState: MyAllTimeHitsState = {
  originalList: [],
  editedList: [],
  loading: false,
  error: null,
  isDirty: false,
};

interface FetchMyAllTimeResponse {
  data: MyAllTimeHits[];
}

// api 호출 함수들 정의
export const fetchMyAllTimeHits = createAsyncThunk<MyAllTimeHits[]>(
  "myAllTimeHitsList/fetchMyAllTimeHits",
  async () => {
    try {
      const response = await axiosInstance.get<FetchMyAllTimeResponse>(
        "/api/member-preference/track"
      );
      return response.data?.data || [];
    } catch (error) {
      console.error("fetchMyAllTimeHits 에러:", error);
      return [];
    }
  }
);

export const addMyAllTimeTrack = createAsyncThunk<void, MyAllTimeHits[]>(
  "myAllTimeHitsList/addMyAllTimeTrack",
  async (trackList) => {
    await axiosInstance.post("/api/member-preference/track", trackList);
  }
);

export const deleteMyAllTimeTrack = createAsyncThunk<
  { preferenceTrackSeq: string; rank: number }[],
  { preferenceTrackSeq: string; rank: number }[]
>("myAllTimeHitsList/deleteMyAllTimeTrack", async (trackList) => {
  await axiosInstance.delete("/api/member-preference/track", {
    data: trackList,
  });
  return trackList; // 삭제된 트랙 정보 반환
});

// 변경사항 여부 체크
function checkIsDirty(state: MyAllTimeHitsState) {
  return (
    JSON.stringify(state.originalList) !== JSON.stringify(state.editedList)
  );
}

// 슬라이스 정의
const myAllTimeHitsSlice = createSlice({
  name: "myAllTimeHitsList",
  initialState,
  reducers: {
    toggleTrack: (state, action: PayloadAction<Track>) => {
      const existingIndex = state.editedList.findIndex(
        (track) => track.spotifyTrackSeq === action.payload.spotifyTrackSeq
      );

      if (existingIndex !== -1) {
        state.editedList.splice(existingIndex, 1);
      } else {
        if (state.editedList.length >= 10) {
          return;
        }
        const newTrack = {
          ...action.payload,
          rank: state.editedList.length + 1,
        };
        state.editedList.push(newTrack);
      }
      state.isDirty = checkIsDirty(state);
    },

    removeTrack: (state, action: PayloadAction<Track>) => {
      state.editedList = state.editedList.filter(
        (track) => track.spotifyTrackSeq !== action.payload.spotifyTrackSeq
      );
      state.isDirty = checkIsDirty(state);
    },

    updateTrackOrder: (state, action: PayloadAction<Track[]>) => {
      state.editedList = action.payload.map((track, index) => ({
        ...track,
        rank: index + 1,
      }));
      state.isDirty = checkIsDirty(state);
    },

    clearError: (state) => {
      state.error = null;
    },

    resetState: (state) => {
      state.originalList = [];
      state.editedList = [];
      state.isDirty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 목록 불러오기 api 호출
      .addCase(fetchMyAllTimeHits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAllTimeHits.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || [];
        const parsed = payload.map((item, index) => ({
          trackArtistNameList: item.trackArtistNameList,
          preferenceTrackSeq: item.preferenceTrackSeq,
          spotifyTrackSeq: item.spotifyTrackSeq,
          spotifyTrackId: item.spotifyTrackId,
          name: item.name,
          imageList: item.imageList,
          rank: item.rank || index + 1,
        }));
        state.originalList = parsed;
        state.editedList = [...parsed];
        state.isDirty = false;
      })
      .addCase(fetchMyAllTimeHits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "my all time hits 조회 실패";
      })

      // 곡 추가하기 api 호출
      .addCase(addMyAllTimeTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMyAllTimeTrack.fulfilled, (state) => {
        state.loading = false;
        state.originalList = [...state.editedList];
        state.isDirty = false;
      })
      .addCase(addMyAllTimeTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "트랙 추가 실패";
      })

      // 곡 삭제하기
      .addCase(deleteMyAllTimeTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMyAllTimeTrack.fulfilled, (state, action) => {
        state.loading = false;

        const deletedTrackSeqs = action.payload
          .map((track) => track.preferenceTrackSeq)
          .filter((seq): seq is string => seq !== undefined);

        state.originalList = state.originalList.filter(
          (track) =>
            track.preferenceTrackSeq &&
            !deletedTrackSeqs.includes(track.preferenceTrackSeq)
        );
        state.editedList = state.editedList.filter(
          (track) =>
            track.preferenceTrackSeq &&
            !deletedTrackSeqs.includes(track.preferenceTrackSeq)
        );

        // 순서 재정렬
        state.originalList = state.originalList.map((track, index) => ({
          ...track,
          rank: index + 1,
        }));
        state.editedList = state.editedList.map((track, index) => ({
          ...track,
          rank: index + 1,
        }));

        state.isDirty = false;
      })

      .addCase(deleteMyAllTimeTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "트랙 삭제 실패";
      });
  },
});

export const {
  toggleTrack,
  removeTrack,
  updateTrackOrder,
  clearError,
  resetState,
} = myAllTimeHitsSlice.actions;

export default myAllTimeHitsSlice.reducer;
