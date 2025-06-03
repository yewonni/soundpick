import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export interface Comment {
  seq: string;
  content: string;
  star: number;
  nickname: string;
  editable: boolean;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// 댓글 목록 조회
interface FetchCommentsArg {
  page: number;
  size: number;
  spotifyPlaylistSeq: string;
}
interface FetchCommentsResponse {
  data: {
    content: Comment[];
  };
}

export const fetchComments = createAsyncThunk<Comment[], FetchCommentsArg>(
  "comments/fetchComments",
  async ({ page = 0, size = 10, spotifyPlaylistSeq }) => {
    const response = await axiosInstance.get<FetchCommentsResponse>(
      `/api/playlist/${spotifyPlaylistSeq}/reviews`,
      {
        params: { page, size },
      }
    );
    return response.data.data.content;
  }
);

// 댓글 등록
interface AddCommentsRequest {
  spotifyPlaylistSeq: string;
  content: string;
  star: number;
}

export const addComments = createAsyncThunk<void, AddCommentsRequest>(
  "comments/addComments",
  async ({ spotifyPlaylistSeq, content, star }) => {
    await axiosInstance.post(`/api/playlist/${spotifyPlaylistSeq}/reviews`, {
      spotifyPlaylistSeq,
      content,
      star,
    });
  }
);

// 댓글 수정
interface EditCommentsRequest {
  spotifyPlaylistSeq: string;
  seq: string;
  content: string;
  star: number;
}

export const editComments = createAsyncThunk<void, EditCommentsRequest>(
  "comments/editComments",
  async ({ spotifyPlaylistSeq, seq, content, star }) => {
    await axiosInstance.put(
      `/api/playlist/${spotifyPlaylistSeq}/reviews/${seq}`,
      {
        content,
        star,
      }
    );
  }
);

// 댓글 삭제
interface DeleteCommentsRequest {
  spotifyPlaylistSeq: string;
  seq: string;
}

export const deleteComments = createAsyncThunk<void, DeleteCommentsRequest>(
  "comments/deleteComments",
  async ({ spotifyPlaylistSeq, seq }) => {
    await axiosInstance.delete(
      `/api/playlist/${spotifyPlaylistSeq}/reviews/${seq}`
    );
  }
);

// 슬라이스 정의
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 목록 조회
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "댓글 조회 실패";
      });
  },
});

export default commentSlice.reducer;
