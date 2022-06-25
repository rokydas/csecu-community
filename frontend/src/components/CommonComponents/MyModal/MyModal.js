import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #3368c6',
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  textAlign: "center"
};

const MyModal = ({ open, setOpen, title, description }) => {

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {description && <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>}
          <button className='custom-btn my-2' onClick={() => setOpen(false)}>OK</button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default MyModal