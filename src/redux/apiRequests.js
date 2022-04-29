import { APIPaths } from "../utils/index";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  activationEmailSuccess,
  activationEmailFailed,
} from "./authSlice";
import axios from "axios";

import {
  updateStart,
  updateSuccess,
  updateError,
  getUserStart,
  getUserSuccess,
  getUserFailed,
} from "./userSlice";

import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  deletePostFailed,
  deletePostStart,
  deletePostSuccess,
  getAllPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  // getOnePostFailed,
  // getOnePostStart,
  // getOnePostSuccess,
  // getUserPostFailed,
  // getUserPostStart,
  // getUserPostSuccess,
  interactPostFailed,
  interactPostStart,
  interactPostSuccess,
} from "./postSlice";

//AUTH
export const loginUser = async (user, dispatch, navigate, state) => {
  dispatch(loginStart());
  dispatch(updateStart());
  try {
    const res = await axios.post(`${APIPaths.Auth}/login`, user);
    dispatch(loginSuccess(res.data));
    dispatch(updateSuccess(res.data));
    navigate(state?.path || "/newsfeed");
  } catch (e) {
    dispatch(loginFailed(e.response.data));
    dispatch(updateError());
  }
};

export const registerUser = async (user, dispatch, setSuccess) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${APIPaths.Auth}/register`, user);
    dispatch(registerSuccess(setSuccess(res.data)));
  } catch (e) {
    console.log(e.response.data);
    dispatch(registerFailed(e.response.data));
  }
};

export const activationEmail = async (activationToken, dispatch, setSuccess) => {
  try {
    const res = await axios.post(`${APIPaths.Auth}/activation`, {activationToken});
    dispatch(activationEmailSuccess(setSuccess(res.data)));
  } catch (e) {
    console.log(e.response.data);
    dispatch(activationEmailFailed(e.response.data));
  }
};

export const logOutUser = async (dispatch, token, userId, navigate) => {
  dispatch(logoutStart());
  try {
    await axios.post(`${APIPaths.Auth}/logout`, userId, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(logoutSuccess());
    localStorage.clear();
    navigate("/");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const getUser = async (dispatch, id, token) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`${APIPaths.Users}/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const createPost = async (dispatch, token, post, postToggle) => {
  dispatch(createPostStart());
  try {
    await axios.post(`${APIPaths.Posts}`, post, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(postToggle(false));
    dispatch(createPostSuccess());
  } catch (err) {
    dispatch(createPostFailed());
  }
};

export const deletePost = async (
  dispatch,
  token,
  id,
  userId,
  setDelete,
) => {
  dispatch(deletePostStart());
  try {
    await axios.delete(`${APIPaths.Posts}/${id}`, {
      headers: { token: `Bearer ${token}` },
      data: { userId: userId },
    });
    dispatch(deletePostSuccess());
    setDelete({
      open: false,
      status: true,
      id: id
    });
  } catch (err) {
    dispatch(deletePostFailed());
  }
};

export const getAllPosts = async (dispatch, token, setLoading, pageNumber) => {
  dispatch(getAllPostStart());
  try {
    setLoading(true);
    const res = await axios.get(
      `${APIPaths.Posts}?page=${pageNumber}&limit=4`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(getAllPostSuccess(res.data.results));
    setLoading(false);
  } catch (e) {
    dispatch(getAllPostFailed());
  }
};

// export const getOnePost = async (dispatch, token, postId) =>
//   dispatch(getOnePostStart());
//   try {
//     const res = await axios.get(`${APIPaths.Posts}/${postId}`, {
//       headers: { token: `Bearer ${token}` },
//     });
//     dispatch(getOnePostSuccess(res.data));
//   } catch (err) {
//     dispatch(getOnePostFailed());
//   }
// };

export const likePost = async (dispatch, token, post, user) => {
  dispatch(interactPostStart());
  try {
    await axios.patch(`${APIPaths.Posts}/${post._id}/like`, user?._id , {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(interactPostSuccess());
  } catch (err) {
    dispatch(interactPostFailed());
  }
};

export const unLikePost = async (dispatch, token, post, userId) => {
  // const newPost = {...post, likes: post.likes.filter(like => like._id !== userId)}
  dispatch(interactPostStart());
  try {
    await axios.patch(`${APIPaths.Posts}/${post._id}/unlike`, userId , {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(interactPostSuccess());
  } catch (err) {
    dispatch(interactPostFailed());
  }
};