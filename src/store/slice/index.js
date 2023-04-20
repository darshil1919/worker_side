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

import requestDetailsSlice from './requestSlice/requestDetailSlice';
import allRequestDetailSlice from './requestSlice/allRequestDetailSlice';
import requestSlice from './requestSlice/requestSlice';

import workDetailsSlice from './workSlice/workDetailSlice';
import allWorkDetailSlice from './workSlice/allWorkDetailSlice';
import workSlice from './workSlice/workSlice';
import updatePassword from "./workerSlice/updatePassword";
import forgotPasswordSlice from "./workerSlice/forgotPasswordSlice";

let rootReducer = combineReducers({
    worker: workerSlice,
    updatePassword: updatePassword,
    forgotPassword: forgotPasswordSlice,

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

    //request slice
    requestDetail: requestDetailsSlice,
    allRequest: allRequestDetailSlice,
    request: requestSlice,

    //request slice
    workDetail: workDetailsSlice,
    allWork: allWorkDetailSlice,
    work: workSlice,
});

export default rootReducer;
