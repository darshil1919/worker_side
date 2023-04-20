import axios from "axios";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOAD_WORKER_REQUEST,
  LOAD_WORKER_SUCCESS,
  LOAD_WORKER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../slice/workerSlice/workerSlice";
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "../slice/workerSlice/updatePassword";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../slice/workerSlice/forgotPasswordSlice";

// worker login
export const login =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        dispatch(LOGIN_REQUEST());

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
          `/api/v1/worker/login`,
          { email, password },
          config
        );

        console.log("data-->", data);
        dispatch(LOGIN_SUCCESS(data.data));
      } catch (error) {
        console.log("error-->", error);
        console.log("error.response.data.message--->", error.response.data.message);
        dispatch(LOGIN_FAIL(error.response.data.message));
        toast.error(error.response.data.message)
      }
    };

// Load worker
export const loadWorker = () => async (dispatch) => {
  try {
    dispatch(LOAD_WORKER_REQUEST());

    const { data } = await axios.post(`/api/v1/worker/getworkerwithid`);
    console.log(data)

    dispatch(LOAD_WORKER_SUCCESS(data.data));
  } catch (error) {
    dispatch(LOAD_WORKER_FAIL(error.response));
  }
};

// Logout Worker
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/worker/logout`);

    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL(error.response.data.message));
  }
};

// update worker password
export function updatePassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/worker/updatepassword`,
        payload,
        config
      );

      dispatch(UPDATE_PASSWORD_SUCCESS(data.data));
      toast.success(data.data)
    } catch (error) {
      dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// forgot password
export function forgotPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(FORGOT_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/worker/forgotpassword`,
        payload,
        config
      );

      dispatch(FORGOT_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
    } catch (error) {
      dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// reset password
export function resetPassword(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(RESET_PASSWORD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/worker/resetpassword`,
        payload,
        config
      );

      dispatch(RESET_PASSWORD_SUCCESS(data.data.message));
      toast.success(data.data.message)
      // const navigate = useNavigate();
      // navigate("/SignIn")
    } catch (error) {
      dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
      toast.error(error.response.data.message)
    }
  };
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
