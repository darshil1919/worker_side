import axios from "axios";
import {
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  ALL_EVENT_FAIL,
  CLEAR_ERRORS as ALL_EVENT_CLEAR_ERRORS
} from "../slice/workerScheduleSlice/allEventDetailSlice";
import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_CLEAR,
  EVENT_FAIL,
  CLEAR_ERRORS as EVENT_DETAILS_CLEAR_ERRORS
} from "../slice/workerScheduleSlice/eventDetailSlice";
import {
  DELETE_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_RESET,
  UPDATE_EVENT_RESET,
  CLEAR_ERRORS as EVENT_CLEAR_ERRORS
} from '../slice/workerScheduleSlice/eventSlice';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function getEvent(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(ALL_EVENT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getevent`, payload, config);

      // const convertedDates = await data.data.schedule.map(event => {
      //   return {
      //     title: event.title,
      //     start: new Date(event.start),
      //     end: new Date(event.end),
      //     _id: event._id,
      //     description: event.description,
      //   }
      // });

      const updatedArray = await data.data.schedule.map((obj, index) => {
        return {
          ...obj,
          start: new Date(Date.parse(obj.start)),
          end: new Date(Date.parse(obj.end)),
        };
      });
      dispatch(ALL_EVENT_SUCCESS(updatedArray));

    } catch (error) {
      dispatch(ALL_EVENT_FAIL(error.message));
    }
  };
}

export function getSingleEvent(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(EVENT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/getsingleevent`, payload, config);
      dispatch(EVENT_SUCCESS(data.data.schedule[0]));

    } catch (error) {
      dispatch(EVENT_FAIL(error.message));
    }
  };
}

export function addEvent(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(EVENT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/worker/addevent`, payload, config);
      dispatch(EVENT_SUCCESS(data.data.message));

      toast.success(data.data.message);

    } catch (error) {
      console.log("error-->", error);
      dispatch(EVENT_FAIL(error.response.data.message));

      toast.error(error.response.data.message);
    }
  };
}

export function updateEvent(editId, payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(UPDATE_EVENT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/updateevent?id=${editId}`;
      const { data } = await axios.post(endpoint, payload, config);

      console.log("data.data-->", data);
      dispatch(UPDATE_EVENT_SUCCESS(data.data));
      toast.success(data.data);

    } catch (error) {
      dispatch(UPDATE_EVENT_FAIL(error.message));
      toast.error(error.response);
    }
  };
}

export function deleteEvent(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DELETE_EVENT_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };
      let endpoint = `/api/v1/worker/deleteevent`;
      const { data } = await axios.post(endpoint, payload, config);
      console.log("data-->", data);
      console.log("data.data.type == SUCCESS-->", data.data.type == "SUCCESS");
      dispatch(DELETE_EVENT_SUCCESS(data.type == "SUCCESS"));

      toast.success(data.data);

    } catch (error) {
      dispatch(DELETE_EVENT_FAIL(error.message));
      toast.error(error.response.data.message);
    }
  };
}

export function resetDeleteService(payload) {
  return async (dispatch, getState) => {
    dispatch(DELETE_EVENT_RESET());
  };
}

export function clearEvent(payload) {
  return async (dispatch, getState) => {
    dispatch(EVENT_CLEAR());
  };
}