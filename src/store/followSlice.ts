import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Friend {
  memberSeq: string;
  nickname: string;
  imageUrl: string | null;
  followed: boolean;
}

interface FollowState {
  friends: Friend[];
  currentPage: number;
  totalPages: number;
}

const initialState: FollowState = {
  friends: [],
  currentPage: 0,
  totalPages: 0,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setFriends(state, action: PayloadAction<Friend[]>) {
      state.friends = action.payload;
    },
    follow(state, action: PayloadAction<string>) {
      const idx = state.friends.findIndex(
        (f) => f.memberSeq === action.payload
      );
      if (idx !== -1) state.friends[idx].followed = true;
    },
    unfollow(state, action: PayloadAction<string>) {
      const idx = state.friends.findIndex(
        (f) => f.memberSeq === action.payload
      );
      if (idx !== -1) state.friends[idx].followed = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setFriends, follow, unfollow, setCurrentPage, setTotalPages } =
  followSlice.actions;
export default followSlice.reducer;
