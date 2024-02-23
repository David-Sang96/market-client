import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    removeUserId: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, removeUserId } = userSlice.actions;
export default userSlice.reducer;
