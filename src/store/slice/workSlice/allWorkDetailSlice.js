import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    // _id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
}

const allWorkDetailSlice = createSlice({
    name: 'allWork',
    initialState: {
        loading: false,
        allWork: []
    },
    reducers: {
        ALL_WORK_REQUEST(state, action) { //1
            return {
                loading: true,
                allWork: [],
            };
        },
        ALL_WORK_SUCCESS(state, action) { //2
            return {
                loading: false,
                allWork: action.payload,
            };
        },
        ALL_WORK_FAIL(state, action) { //3
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

export default allWorkDetailSlice.reducer;

export const {
    ALL_WORK_REQUEST,
    ALL_WORK_SUCCESS,
    ALL_WORK_FAIL,
    CLEAR_ERRORS } = allWorkDetailSlice.actions;