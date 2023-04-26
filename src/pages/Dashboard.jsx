import React, { useEffect } from 'react';
import { Header } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { BsCurrencyRupee } from 'react-icons/bs';
import { Button, SparkLine } from '../components';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';

import { useStateContext } from '../contexts/ContextProvider';
import { getWorkerDashboard } from '../store/action/dashboardAction';
import Loader from '../components/Loader/Loader';

// import { UPDATE_CATEGORY_RESET, DELETE_CATEGORY_RESET } from '../store/slice/categorySlice/categorySlice';

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const dispatch = useDispatch();

  const { dashboard, loading: dashboardLoader } = useSelector((state) => state.dashboard);

  const { isAuthenticated, worker, loading: workerLoader } = useSelector((state) => state.worker);

  console.log("dashboard------>", dashboard);
  useEffect(() => {
    dispatch(getWorkerDashboard());
  }, []);

  return (
    <>
      {
        dashboardLoader && workerLoader ?
          (
            <Loader />
          ) : (
            < div className="mt-24" >
              <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-400">Total Revenue</p>
                      <p className="text-2xl">₹{dashboard.earning ? dashboard?.earning?.total : 0}</p>
                    </div>
                    <button
                      type="button"
                      style={{ backgroundColor: currentColor }}
                      className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                    >
                      <BsCurrencyRupee />
                    </button>
                  </div>
                  {/* <div className="mt-6">
                      <Button
                        color="white"
                        bgColor={currentColor}
                        text="Download"
                        borderRadius="10px"
                      />
                    </div> */}
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard.completedOrders ? dashboard?.completedOrders : 0}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Completed Orders</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <MdOutlineSupervisorAccount />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard.confirmedOrders ? dashboard?.confirmedOrders : 0}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Confirmed Orders</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <GrUserWorker />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard.cancelledOrders ? dashboard?.cancelledOrders : 0}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Cancelled Orders</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <MdOutlineSupervisorAccount />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {dashboard?.monthlyEarning?.length > 0 ?
                (
                  <div className="flex gap-10 flex-wrap justify-center">
                    <div className="bg-white w-4/5 dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl">
                      <div>
                        <div
                          className="rounded-2xl p-4 m-3"
                          style={{ backgroundColor: currentColor }}
                        >
                          <div className="flex justify-between flex-col	flex-wrap items-center sm:flex-row">
                            <p className="font-semibold text-white text-2xl">Monthly Revenue</p>

                            <div>
                              <p className="text-white mt-6">{dashboard.monthlyEarning ? `${dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].month} ${dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].year}` : null}</p>
                              <p className="text-2xl text-white font-semibold">₹{dashboard.monthlyEarning ? dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].total : null}</p>
                            </div>
                          </div>

                        </div>
                        <div className="mt-4">
                          <div className="">
                            <ResponsiveContainer debounce={300} width="100%" height={300}>
                              <BarChart
                                data={dashboard.monthlyEarning ? dashboard?.monthlyEarning : null}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill='#00bdae' />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              }

              {/* <div className="flex gap-10 flex-wrap justify-center">
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl">
                    <div>
                      <div
                        className=" rounded-2xl p-4 m-3"
                        style={{ backgroundColor: currentColor }}
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-white text-2xl">Monthly Orders</p>
          
                          <div>
                            <p className="text-white mt-6">{dashboard.orderStatus ? `${dashboard?.orderStatus[dashboard?.orderStatus.length - 1].month} ${dashboard?.orderStatus[dashboard?.orderStatus.length - 1].year}` : null}</p>
                            <p className="text-2xl text-white font-semibold">{dashboard.orderStatus ? dashboard?.orderStatus[dashboard?.orderStatus.length - 1].totalOrders : null}</p>
                          </div>
                        </div>
          
                      </div>
                      <div className="mt-4">
                        <LineChart
                          width={500}
                          height={300}
                          data={dashboard.orderStatus ? dashboard?.orderStatus : null}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="totalOrders" stroke="#00bdae" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="cancelledOrders" stroke="#8884d8" />
                          <Line type="monotone" dataKey="completedOrders" stroke="#82ca9d" />
                        </LineChart>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div >
          )
      }
    </>
  );
};
export default Dashboard;
