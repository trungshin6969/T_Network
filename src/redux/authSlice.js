import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    currentUser: null,
    error: false,
    isFetching: false,
    success: false,
    message: null,
  },
  register: {
    error: false,
    isFetching: false,
    success: false,
  },
  activationEmail: {
    error: false,
    success: false,
  },
  logout: {
    error: false,
    isFetching: false,
    success: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.error = false;
      state.login.success = true;
      state.login.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.success = false;
      state.login.message = action.payload;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
      // state.register.message = action.payload;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
      // state.register.message = action.payload;
    },
    activationEmailSuccess: (state) => {
      state.activationEmail.success = true;
      state.activationEmail.error = false;
    },
    activationEmailFailed: (state) => {
      state.activationEmail.success = false;
      state.activationEmail.error = true;
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {},
    logoutFailed: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
      state.logout.success = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  activationEmailStart,
  activationEmailSuccess,
  activationEmailFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
