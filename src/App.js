import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Ecommerce, Orders, Request, Schedule, Login, Error, Dashboard, Service, AddService, UpdateEvent, AddEvents, Work, ViewWork } from "./pages";
import "./App.css";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { loadWorker } from "./store/action/workerAction";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, worker } = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(loadWorker());
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute Component={Ecommerce} />}>
          <Route exact path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<ProtectedRoute Component={Dashboard} />} /> */}
          {/* <ProtectedRoute
          // exact
          path="/"
          component={Dashboard}
        /> */}
          <Route exact path="/work" element={<Work />} />
          <Route exact path="/work/view/:id" element={<ViewWork />} />
          <Route exact path="/request" element={<Request />} />
          <Route exact path="/schedule" element={<Schedule />} />
          {/* <Route exact path="/category" element={<Category />} /> */}
          {/* <Route exact path="/sub-category" element={<SubCategory />} /> */}
          {/* <Route exact path="/sub-category/add-subcategory" element={<AddSubCategory />} /> */}
          {/* <Route exact path="/sub-category/edit-subcategory/:id" element={<AddSubCategory />} /> */}
          <Route exact path="/service" element={<Service />} />
          <Route exact path="/service/add-service" element={<AddService />} />
          <Route exact path="/service/edit-service/:id" element={<AddService />} />
          {/* <Route exact path="/schedule/add-event" element={<AddEvent />} /> */}
          <Route exact path="/schedule/add-event" element={<AddEvents />} />
          <Route exact path="/schedule/event-update/:id" element={<UpdateEvent />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
