import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import RequestDialog from "../components/request/RequestDialog";
import {
  getEvent,
  getSingleEvent,
  clearEvent,
} from "../store/action/eventAction";
import * as moment from "moment";

import { getRequest, getSingleRequest } from "../store/action/requestAction";
import { connect } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";

const Request = ({
  allEvent,
  getRequest,
  getSingleRequest,
  allRequest,
  clearEvent,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});

  useEffect(() => {
    getRequest();
  }, [getSingleRequest]);

  const openEventClick = (event) => {
    setDialogData(event);
    setOpen(true);
    // if (event._id) {
    //   let payload = {
    //     _id: event._id,
    //   }
    //   getSingleRequest(payload);
    // }

    return;
  };

  const closeEventClick = () => {
    setOpen(false);
    // setTimeout(() => clearEvent(), 300);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Request" />

      <div>
        {allRequest?.map((data, index) => {
          let start = moment(data?.startTime).format("ddd DD MMM YY LT");
          let end = moment(data?.endTime).format("ddd DD MMM YY LT");
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 shadow-lg shadow-blue-500 my-10 hover:shadow-gray-500"
            >
              <div className="flex flex-col  p-4">
                <div>
                  <p>category: {data.categoryDetail.categoryName}</p>
                </div>
                <div>
                  <p>Start Time: {start}</p>
                </div>
                <div>
                  <p>End Time: {end}</p>
                </div>
                <div>
                  <p>
                    address:{" "}
                    {`${data.serviceLocation.address}, ${data.serviceLocation.city}, ${data.serviceLocation.state}, ${data.serviceLocation.pinCode}`}
                  </p>
                </div>
              </div>

              <div className=" justify-end p-4">
                <div className="pb-3">
                  <p>price: ₹{data.grandTotal}</p>
                </div>
                <IconButton
                  variant="contained"
                  onClick={() => openEventClick(data)}
                >
                  <AiFillEye fill="#a855f7" />
                </IconButton>
              </div>
            </div>
          );
        })}
        <RequestDialog
          open={open}
          setOpen={setOpen}
          // handleOpen={openEventClick}
          handleClose={closeEventClick}
          dialogData={dialogData}
        />
      </div>
    </div>
  );
};

function mapStateToProps({ requestDetail, allRequest }) {
  return {
    requestDetail: requestDetail.requestDetail,
    allRequest: allRequest.allRequest,
  };
}

export default connect(mapStateToProps, {
  getSingleRequest,
  clearEvent,
  getRequest,
})(Request);
