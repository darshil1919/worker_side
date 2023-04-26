import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import Lodder from '../components/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import OtpInput from "react-otp-input";
import {
  deleteWork,
  getSingleWork,
  updateWork,
} from "../store/action/workAction";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';


// import Loading from '../components/small/Loading';

const ViewWork = () => {

  const { id: viewId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setotp] = useState("");
  const [error, setError] = useState('');
  const [color, setColor] = useState('');

  const { workDetail, loading: workLoading } = useSelector((state) => {
    return state.workDetail;
  });

  console.log("workDetail------>", workDetail);

  const getSingleOrder = async () => {
    setTimeout(
      function () {
        if (viewId) {
          let payload = {
            id: viewId,
          };
          dispatch(getSingleWork(payload));
        }
      }, 1000);
  }
  useEffect(() => {
    if (viewId) {
      let payload = {
        id: viewId,
      };
      dispatch(getSingleWork(payload));
    }
    // dispatch(getSubCategory());
  }, [dispatch, viewId]);

  let start = moment(workDetail?.startTime).format("ddd DD MMM YY LT");
  let end = moment(workDetail?.endTime).format("ddd DD MMM YY LT");

  const handleChange = (otpValue) => {
    const numericValue = otpValue.replace(/[^0-9]/g, '');
    setotp(numericValue);
    setError('');
  };

  const cancleOrder = () => {
    let payload = {
      status: 'cancelled',
    };
    dispatch(deleteWork(viewId, payload));
  };

  let working = workDetail?.startServiceCode && !workDetail?.endServiceCode;

  const handleSubmit = () => {
    // Check if all input values are numbers before submitting
    const isNumeric = /^[0-9]+$/.test(otp);
    if (otp.length === 4 && isNumeric) {
      if (workDetail?.startServiceCode && !workDetail?.endServiceCode) {
        // return
        let payload = {
          status: 'working',
          startServiceCode: otp,
          // orderId: workDetail?._id,
        }
        dispatch(updateWork(workDetail?._id, payload));
        getSingleOrder();
        setotp("");
      } else if (workDetail?.startServiceCode && workDetail?.endServiceCode) {

        let payload = {
          status: 'completed',
          endServiceCode: otp,
        }
        dispatch(updateWork(workDetail?._id, payload));
        getSingleOrder();
        setotp("");
      }

    } else {
      setError('Invalid otp');
    }
  };

  const currentTime = new Date();
  const tenMinutesAgo = new Date(currentTime.getTime() + 10 * 60 * 1000);
  let showOtp = new Date(workDetail?.startTime) < tenMinutesAgo;

  return (
    <>
      {
        workLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">View Order</h2>
            </div>

            <div className="flex flex-col items-center md:flex-row justify-between">
              <div className="py-3 px-2 flex justify-around align-middle">
                <p className="font-bold text-2xl">{workDetail?.status}</p>
              </div>
              <div className="py-1 px-2 flex justify-center align-middle">
                <h2 className="">Order Id: {workDetail?._id}</h2>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col lg:flex-row">
                <div className="basis-5/5 p-3 lg:basis-3/5">
                  <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                    {workDetail?.categoryDetail?.categoryName}
                  </div>
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full text-center leading-normal">
                        <thead>
                          <tr className="p-2">
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">quantity</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            workDetail?.items?.map((data, index) => (
                              <tr key={index}>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm"><img className="h-16 w-20" src={`http://localhost:4000/image/serviceImages/${data?.image}`} alt="service Image" /></td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.image}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.quantity}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.quantity * data?.price}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="basis-5/5 p-3 lg:basis-2/5">
                  <div>
                    <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                      work detail
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">Customer name: </span><span>{`${workDetail?.customerDetail?.firstName} ${workDetail?.customerDetail?.lastName}`}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">Address: </span><span>{`${workDetail?.serviceLocation?.address}, ${workDetail?.serviceLocation?.city}, ${workDetail?.serviceLocation?.state}, ${workDetail?.serviceLocation?.pinCode}`}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">contact No.: </span><span>{workDetail?.phone}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">start time: </span><span>{start
                      }</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">end time: </span><span>{end}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">grand total: </span><span>₹{workDetail?.grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {showOtp && workDetail?.status != 'completed' &&
                <div className="flex justify-center">
                  <div className="flex flex-col shadow-md rounded-lg p-10 border items-center">
                    <h2 className="p-2 font-semibold">{working ? 'Enter Start Work Code' : 'Enter End Work Code'}</h2>
                    <div className="p-2">
                      <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        renderSeparator={<span className="px-1.5"></span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          border: "2px solid #0006",
                          borderRadius: "8px",
                          width: "50px",
                          height: "50px",
                          fontSize: "20px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="contained" className='p-2' onClick={handleSubmit}>{working ? 'start work' : 'complete work'}</Button>
                  </div>
                </div>
              }

              {workDetail?.status == "confirmed" &&
                <div className="text-center">
                  <Button variant="contained" color="error" className='p-2' onClick={cancleOrder} disabled={workDetail?.status != "confirmed"}>Cancle Order</Button>
                </div>
              }
            </div>
          </div>
          )
      }

    </>
  );
};

export default ViewWork;
