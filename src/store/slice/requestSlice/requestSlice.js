import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    loading: false,
    request: {}
  },
  reducers: {
    DELETE_REQUEST_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_REQUEST_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_REQUEST_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_REQUEST_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_REQUEST_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_REQUEST_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_REQUEST_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_REQUEST_RESET(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS(state, action) { //4requestSlice
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default requestSlice.reducer;

export const {
  DELETE_REQUEST_REQUEST,
  UPDATE_REQUEST_REQUEST,
  DELETE_REQUEST_SUCCESS,
  UPDATE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  UPDATE_REQUEST_FAIL,
  DELETE_REQUEST_RESET,
  UPDATE_REQUEST_RESET,
  CLEAR_ERRORS } = requestSlice.actions;