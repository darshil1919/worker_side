import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const requestDetailSlice = createSlice({
    name: 'requestDetail',
    initialState: {
        loading: false,
        requestDetail: []
    },
    reducers: {
        REQUEST_REQUEST(state, action) { //1
            return {
                loading: true,
                requestDetail: {}
            };
        },
        REQUEST_SUCCESS(state, action) { //2
            return {
                loading: false,
                requestDetail: action.payload,
            };
        },
        REQUEST_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
            };
        },
        REQUEST_CLEAR(state, action) { //3
            return {
                loading: false,
                requestDetail: {},
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

export default requestDetailSlice.reducer;

export const {
    REQUEST_REQUEST,
    REQUEST_SUCCESS,
    REQUEST_FAIL,
    REQUEST_CLEAR,
    CLEAR_ERRORS } = requestDetailSlice.actions;