import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Modal as PopUp, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  p: 4,
};

interface ModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal: FC<ModalProps> = ({ setOpen, open }) => {
  const { fields, } = useSelector((state: RootState) => state.form);
  const handleClose = () => setOpen(false);

  return (
    <PopUp
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        {fields.map(field => {
          return (<Box display={'flex'}>
            <Typography width={'50%'} >
              {field.title}
            </Typography>
            <Typography width={'50%'} >
              {field.value}
            </Typography>
          </Box>)
        })}
      </Box>
    </PopUp>
  )
}

export default Modal