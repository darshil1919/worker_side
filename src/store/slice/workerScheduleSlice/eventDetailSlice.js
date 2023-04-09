import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const eventDetailsSlice = createSlice({
    name: 'eventDetail',
    initialState: {
        loading: false,
        eventDetail: []
    },
    reducers: {
        EVENT_REQUEST(state, action) { //1
            return {
                loading: true,
                eventDetail: {}
            };
        },
        EVENT_SUCCESS(state, action) { //2
            return {
                loading: false,
                eventDetail: action.payload,
            };
        },
        EVENT_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
            };
        },
        EVENT_CLEAR(state, action) { //3
            return {
                loading: false,
                eventDetail: {},
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

export default eventDetailsSlice.reducer;

export const {
    EVENT_REQUEST,
    EVENT_SUCCESS,
    EVENT_FAIL,
    EVENT_CLEAR,
    CLEAR_ERRORS } = eventDetailsSlice.actions;