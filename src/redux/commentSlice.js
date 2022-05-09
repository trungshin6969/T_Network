import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    userComments: {
      comments: null,
      pending: false,
      error: false,
      success: false,
    },
    createComments: {
      pending: false,
      error: false,
      success: false,
    },
    deleteComments: {
      pending: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    createCommentStart: (state) => {
      state.createComments.pending = true;
      state.createComments.success = false;
      state.createComments.error = false;
    },
    createCommentSuccess: (state) => {
      state.createComments.pending = false;
      state.createComments.success = true;
    },
    createCommentFailed: (state) => {
      state.createComments.pending = false;
      state.createComments.error = true;
    },
  },
});

export const { createCommentStart, createCommentSuccess, createCommentFailed } =
  commentSlice.actions;
export default commentSlice.reducer;
