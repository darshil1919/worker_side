import { createSlice } from '@reduxjs/toolkit';

const workSlice = createSlice({
  name: 'work',
  initialState: {
    loading: false,
    work: {}
  },
  reducers: {
    DELETE_WORK_REQUEST(state, action) { //1
      return {
        ...state,
        loading: true,
      };
    },
    UPDATE_WORK_REQUEST(state, action) { //2
      return {
        ...state,
        loading: true,
      };
    },
    DELETE_WORK_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    },
    UPDATE_WORK_SUCCESS(state, action) { //3
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    DELETE_WORK_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_WORK_FAIL(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_WORK_RESET(state, action) {
      return {
        ...state,
        isDeleted: false,
      };
    },
    UPDATE_WORK_RESET(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    CLEAR_ERRORS(state, action) { 
      return {
        ...state,
        error: null,
      };
    },
  }
});

export default workSlice.reducer;

export const {
  DELETE_WORK_REQUEST,
  UPDATE_WORK_REQUEST,
  DELETE_WORK_SUCCESS,
  UPDATE_WORK_SUCCESS,
  DELETE_WORK_FAIL,
  UPDATE_WORK_FAIL,
  DELETE_WORK_RESET,
  UPDATE_WORK_RESET,
  CLEAR_ERRORS } = workSlice.actions;