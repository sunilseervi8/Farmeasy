// slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  role: string;
  email:string;
  token: string;
  profileUrl:string
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log(action.payload)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
// console.log(User.role)
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
