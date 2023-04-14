import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const allRequestDetailSlice = createSlice({
    name: 'allRequest',
    initialState: {
        loading: false,
        allRequest: []
    },
    reducers: {
        ALL_REQUEST_REQUEST(state, action) { //1
            return {
                loading: true,
                allRequest: [],
            };
        },
        ALL_REQUEST_SUCCESS(state, action) { //2
            return {
                loading: false,
                allRequest: action.payload,
            };
        },
        ALL_REQUEST_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
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

export default allRequestDetailSlice.reducer;

export const {
    ALL_REQUEST_REQUEST,
    ALL_REQUEST_SUCCESS,
    ALL_REQUEST_FAIL,
    CLEAR_ERRORS } = allRequestDetailSlice.actions;