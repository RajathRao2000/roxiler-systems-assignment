import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {} };
try {
  const userdetails = localStorage.setItem("user");
  initialState.user(JSON.parse(userdetails));
} catch {}
const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveUserData(state, action) {
      state.user = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = {};
    },
  },
});

export const userDataActions = userSlice.actions;
export default userSlice.reducer;
