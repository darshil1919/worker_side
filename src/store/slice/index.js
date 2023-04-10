import { combineReducers } from "@reduxjs/toolkit";

import workerSlice from './workerSlice/workerSlice';
import allCategorySlice from './categorySlice/allCategorySlice';
import newCategorySlice from './categorySlice/newCategorySlice';
import categorySlice from './categorySlice/categorySlice';

import allSubCategorySlice from './subCategorySlice/allSubCategorySlice';
import subCategoryDetailsSlice from './subCategorySlice/subCategoryDetailsSlice';
import subCategorySlice from './subCategorySlice/subCategorySlice';

import allServiceSlice from './serviceSlice/allServiceSlice';
import serviceDetailsSlice from './serviceSlice/serviceDetailsSlice';
import serviceSlice from './serviceSlice/serviceSlice';

import eventDetailsSlice from './workerScheduleSlice/eventDetailSlice';
import allEventDetailSlice from './workerScheduleSlice/allEventDetailSlice';
import eventSlice from './workerScheduleSlice/eventSlice';


let rootReducer = combineReducers({
    worker: workerSlice,

    // category slice
    allCategory: allCategorySlice,
    newCategory: newCategorySlice,
    category: categorySlice,

    // subCategory slice
    allSubCategory: allSubCategorySlice,
    subCategoryDetails: subCategoryDetailsSlice,
    subCategory: subCategorySlice,

    // service slice
    allService: allServiceSlice,
    serviceDetails: serviceDetailsSlice,
    service: serviceSlice,

    //workerSchedual slice
    eventDetail: eventDetailsSlice,
    allEvent: allEventDetailSlice,
    event: eventSlice,
});

export default rootReducer;
