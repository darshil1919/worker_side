import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    loading: false,
    event: {}
  },
  reducers: {
    DELETE_EVENT_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_EVENT_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_EVENT_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_EVENT_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_EVENT_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_EVENT_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_EVENT_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_EVENT_RESET(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS(state, action) { //4
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default eventSlice.reducer;

export const {
  DELETE_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_RESET,
  UPDATE_EVENT_RESET,
  CLEAR_ERRORS } = eventSlice.actions;