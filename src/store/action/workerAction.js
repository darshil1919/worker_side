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
      }
    };

// Load worker
export const loadWorker = () => async (dispatch) => {
  try {
    dispatch(LOAD_WORKER_REQUEST());

    const { data } = await axios.post(`/api/v1/worker/getworkerwithid`);
    console.log(data)

    dispatch(LOAD_WORKER_SUCCESS(data.worker));
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
