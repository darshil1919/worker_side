import axios from "axios";
import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  DASHBOARD_CLEAR,
  CLEAR_ERRORS
} from "../slice/dashboardSlice/dashboardSlice";

export function getWorkerDashboard(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(DASHBOARD_REQUEST());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/dashboard/worker`, payload, config);

      dispatch(DASHBOARD_SUCCESS(data.data));
    } catch (error) {
      dispatch(DASHBOARD_FAIL(error.message));
    }
  };
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};
