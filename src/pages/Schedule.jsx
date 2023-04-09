import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import { getEvent, getSingleEvent, clearEvent } from '../store/action/eventAction'
import { connect } from 'react-redux';
import Button from '@mui/material/Button';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Schedule = ({ allEvent, getEvent, getSingleEvent, clearEvent }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [renderStatus, rerender] = useState(false);

  useEffect(() => {
    getEvent();
    // console.log("i renderd because of refresh or start");
  }, [getSingleEvent])

  useEffect(() => {
    if (renderStatus) {
      getEvent();
      rerender(false);
    }
  }, [renderStatus]);

  const openEventClick = (event) => {
    setOpen(true);
    if (event._id) {
      let payload = {
        _id: event._id,
      }
      getSingleEvent(payload);
    }

    return;
  }

  const eventStyleGetter = (event) => {
    var backgroundColor = '#d32f2f';
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      margin: '2px',
      color: 'white',
      border: '0px',
      display: 'block'
    };
    if (event?.type == 'leave') {
      return {
        style: style
      };
    }
  }

  const closeEventClick = () => {
    setOpen(false);
    setTimeout(() => clearEvent(), 300);
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Schedule" />
      <Button variant="contained" onClick={() => navigate('/schedule/add-event')}>+ Add New</Button>

      <div>
        <Popping
          open={open}
          setOpen={setOpen}
          handleOpen={openEventClick}
          handleClose={closeEventClick}
          renderStatus={renderStatus}
          rerender={rerender}
        />
        <Calendar
          localizer={localizer}
          events={allEvent}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: 50, fontFamily: 'Patrick Hand' }}
          onSelectEvent={openEventClick}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

function mapStateToProps({ eventDetail, allEvent }) {
  return {
    eventDetail: eventDetail.eventDetail,
    allEvent: allEvent.allEvent,
  }
}

export default connect(mapStateToProps, { getSingleEvent, clearEvent, getEvent })(Schedule);
