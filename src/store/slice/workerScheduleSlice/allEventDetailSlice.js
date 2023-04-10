import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const allEventDetailSlice = createSlice({
    name: 'allEvent',
    initialState: {
        loading: false,
        allEvent: []
    },
    reducers: {
        ALL_EVENT_REQUEST(state, action) { //1
            return {
                loading: true,
                allEvent: [],
            };
        },
        ALL_EVENT_SUCCESS(state, action) { //2
            return {
                loading: false,
                allEvent: action.payload,
            };
        },
        ALL_EVENT_FAIL(state, action) { //3
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

export default allEventDetailSlice.reducer;

export const {
    ALL_EVENT_REQUEST,
    ALL_EVENT_SUCCESS,
    ALL_EVENT_FAIL,
    CLEAR_ERRORS } = allEventDetailSlice.actions;