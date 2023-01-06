import { createSlice } from "@reduxjs/toolkit";

export const baseUserURL = process.env.REACT_APP_USERS_API_URI;

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
  },
  reducers: {
    updateUsers(state, action) {
      console.log(action);
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
