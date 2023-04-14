import axios from "axios";
import {
  ALL_WORK_REQUEST,
  ALL_WORK_SUCCESS,
  ALL_WORK_FAIL,
  CLEAR_ERRORS as ALL_WORK_CLEAR_ERRORS
} from "../slice/workSlice/allWorkDetailSlice";
import {
  WORK_REQUEST,
  WORK_SUCCESS,
  WORK_CLEAR,
  WORK_FAIL,
  CLEAR_ERRORS as WORK_DETAILS_CLEAR_ERRORS
} from "../slice/workSlice/workDetailSlice";
import {
  DELETE_WORK_REQUEST,
  UPDATE_WORK_REQUEST,
  DELETE_WORK_SUCCESS,
  UPDATE_WORK_SUCCESS,
  DELETE_WORK_FAIL,
  UPDATE_WORK_FAIL,
  DELETE_WORK_RESET,
  UPDATE_WORK_RESET,
  CLEAR_ERRORS as WORK_CLEAR_ERRORS
} from '../slice/workSlice/workSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getWork(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_WORK_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/order/getwork`, payload, config);

      dispatch(ALL_WORK_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_WORK_FAIL(error.message));
    }
  };
}

export function getSingleWork(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(WORK_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getsinglework`, payload, config);
      dispatch(WORK_SUCCESS(data.data.schedule[0]));

    } catch (error) {
      dispatch(WORK_FAIL(error.message));
    }
  };
}

export function addWork(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(WORK_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/addwork`, payload, config);
      dispatch(WORK_SUCCESS(data.data.message));

      toast.success(data.data.message);

    } catch (error) {
      console.log("error-->", error);
      dispatch(WORK_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateWork(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_WORK_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/updatework?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_WORK_SUCCESS(data.data));
      toast.success(data.data);

    } catch (error) {
      dispatch(UPDATE_WORK_FAIL(error.message));
      toast.error(error.response);
    }
  };
}

export function deleteWork(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_WORK_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/order/deletework`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_WORK_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_WORK_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteService(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_WORK_RESET());
  };
}

export function clearWork(payload) {
  return async (dispatch, getState) => {
    dispatch(WORK_CLEAR());
  };
}