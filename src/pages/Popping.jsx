import React, { useEffect, useState } from "react";
import * as moment from "moment"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { deleteEventApi, closeEvent } from "../Redux/actions";
import { deleteEvent } from "../store/action/eventAction";
import { useNavigate } from "react-router-dom";

const Popping = ({ open, handleClose, eventDetail, deleteEvent, setOpen, renderStatus, rerender }) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  let { _id, description, title, start, end } = eventDetail;
  start = moment(start).format("ddd DD MMM YY LT");
  end = moment(end).format("ddd DD MMM YY LT");

  useEffect(() => {
    if (start) {
      const myDate = new Date(eventDetail.start);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // const isDateLessThanToday = myDate < today;
      setDisabled(myDate < tomorrow);
      setDisabled(eventDetail.title == 'work');
    }
  }, [eventDetail]);

  const handleDelete = async () => {
    let payload = {
      id: _id,
    }
    await deleteEvent(payload);
    rerender(true)
    setOpen(false);
  }

  const modal = () => {
    return (
      <>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          PaperProps={{
            style: {
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px'
            },
          }}
          maxWidth="md"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers={true}>
            {description ? <p className="capitalize">{description}</p> : "No Dsecriptions Yet"}
            <div className="">
              <p className=""><span className="capitalize font-bold">from:</span> {start}</p>
              <p className=""><span className="capitalize font-bold">to:</span> {end}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Close</Button>

            <Button variant="contained" color="success" disabled={disabled}>
              <Link to={`/schedule/event-update/${_id}`} >Update</Link>
            </Button>

            <Button variant="contained" color="error" onClick={handleDelete} disabled={disabled}>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  if (_id) {
    return modal()
  } else {
    return <></>
  }

}

function mapStateToProps({ eventDetail }) {
  return {
    eventDetail: eventDetail.eventDetail,
  }
}

export default connect(mapStateToProps, { deleteEvent })(Popping);