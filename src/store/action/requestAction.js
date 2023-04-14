import axios from "axios";
import {
  ALL_REQUEST_REQUEST,
  ALL_REQUEST_SUCCESS,
  ALL_REQUEST_FAIL,
  CLEAR_ERRORS as ALL_REQUEST_CLEAR_ERRORS
} from "../slice/requestSlice/allRequestDetailSlice";
import {
  REQUEST_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_CLEAR,
  REQUEST_FAIL,
  CLEAR_ERRORS as REQUEST_DETAILS_CLEAR_ERRORS
} from "../slice/requestSlice/requestDetailSlice";
import {
  DELETE_REQUEST_REQUEST,
  UPDATE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  UPDATE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  UPDATE_REQUEST_FAIL,
  DELETE_REQUEST_RESET,
  UPDATE_REQUEST_RESET,
  CLEAR_ERRORS as REQUEST_CLEAR_ERRORS
} from '../slice/requestSlice/requestSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getRequest(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_REQUEST_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getrequest`, payload, config);

      dispatch(ALL_REQUEST_SUCCESS(data.data));

    } catch (error) {
      dispatch(ALL_REQUEST_FAIL(error.message));
    }
  };
}

export function getSingleRequest(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REQUEST_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getsinglerequest`, payload, config);
      dispatch(REQUEST_SUCCESS(data.data.schedule[0]));

    } catch (error) {
      dispatch(REQUEST_FAIL(error.message));
    }
  };
}

export function addRequest(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(REQUEST_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/addrequest`, payload, config);
      dispatch(REQUEST_SUCCESS(data.data.message));

      toast.success(data.data.message);

    } catch (error) {
      console.log("error-->", error);
      dispatch(REQUEST_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateRequest(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_REQUEST_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/updaterequest?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_REQUEST_SUCCESS(data.data));
      toast.success(data.data);

    } catch (error) {
      dispatch(UPDATE_REQUEST_FAIL(error.message));
      toast.error(error.response);
    }
  };
}

export function deleteRequest(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_REQUEST_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/deleterequest`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_REQUEST_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_REQUEST_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteService(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_REQUEST_RESET());
  };
}

export function clearRequest(payload) {
  return async (dispatch, getState) => {
    dispatch(REQUEST_CLEAR());
  };
}