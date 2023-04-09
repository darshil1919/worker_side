import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import * as moment from "moment"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../store/action/eventAction";


//schema to validate event inputs 
const schema = yup.object({
  title: yup.string().required("Can't Be Empty"),
  start: yup.date().required("Please specify the time to start"),
  end: yup
    .date().required("Please specify the time to start")
    .min(
      yup.ref('start'),
      "End date can't be before Start date"
    ),
  description: yup.string().required("Can't Be Empty"),
});

const AddEvents = ({ addEvent }) => {

  const navigate = useNavigate()
  const [dbError, setError] = useState(false)
  // using form - hook to register event data
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values) => {
    let payload = {
      title: values.title,
      start: values.start,
      end: values.end,
      description: values.description,
      type: 'leave',
    }
    addEvent(payload)
    navigate('/schedule');

  }

  const minTime = new Date();
  minTime.setHours(8);
  minTime.setMinutes(0);
  const maxTime = new Date();
  maxTime.setHours(20);
  maxTime.setMinutes(0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);

  return (
    //this form is in bootstrab
    <figure className="py-10 flex bg-gray-100">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder py-8 px-10">

        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">
            Add Event
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center m-5">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Title</label>
            <input {...register("title")} type="text" placeholder="title" className="bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="title" aria-describedby="title" />
            <p className={`text-xs text-red-600 pt-1`}>{errors.title?.message}</p>
          </div>

          <div className="mb-4" style={{ zIndex: "100" }}>
            <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>

            <Controller
              control={control}
              name="start"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  value={field.value}
                  showTimeSelect
                  minDate={tomorrow}
                  maxDate={maxDate}
                  minTime={minTime}
                  maxTime={maxTime}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="start"
                />
              )}
            />
            {/* error handling */}
            <p className={`text-xs text-red-600 pt-1`}>{errors.start?.message}</p>
            <p className={`text-xs text-red-600 pt-1`}>{dbError.start}</p>
          </div>
          <div className="mb-4" style={{ zIndex: "100" }}>
            <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
            {/* end date controller*/}
            <Controller
              control={control}
              name="end"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select end date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  value={field.value}
                  minDate={tomorrow}
                  maxDate={maxDate}
                  minTime={minTime}
                  maxTime={maxTime}
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeSelect
                  className="bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="end"
                />
              )}
            />
            <p className={`text-xs text-red-600 pt-1`}>{errors.end?.message}</p>
            <p className={`text-xs text-red-600 pt-1`}>{dbError.end}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Description</label>
            <input {...register("description")} type="text" placeholder="description your event" className="bg-gray-50 border border-gray-300 outline-blue-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="description" aria-describedby="description" />
            <p className={`text-xs text-red-600 pt-1`}>{errors.description?.message}</p>
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
        </form>
      </div>
    </figure>
  )
}


function mapStateToProps({ }) {
  return {
    // error
    // event
  }
}


export default connect(mapStateToProps, { addEvent })(AddEvents);