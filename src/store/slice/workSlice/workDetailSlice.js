import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const workDetailSlice = createSlice({
    name: 'workDetail',
    initialState: {
        loading: false,
        workDetail: []
    },
    reducers: {
        WORK_REQUEST(state, action) { //1
            return {
                loading: true,
                workDetail: {}
            };
        },
        WORK_SUCCESS(state, action) { //2
            return {
                loading: false,
                workDetail: action.payload,
            };
        },
        WORK_FAIL(state, action) { //3
            return {
                loading: false,
                error: action.payload,
            };
        },
        WORK_CLEAR(state, action) { //3
            return {
                loading: false,
                workDetail: {},
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

export default workDetailSlice.reducer;

export const {
    WORK_REQUEST,
    WORK_SUCCESS,
    WORK_FAIL,
    WORK_CLEAR,
    CLEAR_ERRORS } = workDetailSlice.actions;