import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { updateRequest } from '../../store/action/requestAction';

const RequestDialog = (props) => {
  const dispatch = useDispatch();

  const { open, setOpen, handleClose, dialogData } = props;

  // const handleClose = (value) => {
  //   setOpen(false);
  // };
  console.log("dialogData---->", dialogData);

  const acceptRequest = (id) => {
    let payload = {
      // _id: id,
      status: 'confirmed',
    }
    dispatch(updateRequest(id, payload));
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
      PaperProps={{
        style: {
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px'
        },
      }}>

      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            {dialogData?.categoryDetail?.categoryName}
          </div>
          <IconButton
            onClick={() => { handleClose() }}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div className="flex justify-between ">
          <div>
            <div>
              {
                dialogData?.items?.map((data, index) => (
                  <div key={index}><span>{data?.image}</span> X <span>{data?.quantity}</span></div>
                ))
              }
            </div>
            <div><p>Start Time: {dialogData?.startTime}</p></div>
            <div><p>End Time: {dialogData?.endTime}</p></div>
            <div><p>address: {`${dialogData?.serviceLocation?.address}, ${dialogData?.serviceLocation?.city}, ${dialogData?.serviceLocation?.state}, ${dialogData?.serviceLocation?.pinCode}`}</p></div>
          </div>
          <div>
            <div className='pb-3 text-right font-semibold'><p>Total Amount: ₹{dialogData?.grandTotal}</p></div>
            <div className="text-right">
              <Button variant="contained" onClick={() => acceptRequest(dialogData?._id)}>accept</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RequestDialog;