import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, updateError } from '../features/formSlice.ts';
import { RootState } from '../store.ts';
import { Box, Button, Card, } from '@mui/material';
import CustomInput from './Fields/CustomInput.tsx';
import Modal from './Modal.tsx';

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const { fields, button } = useSelector((state: RootState) => state.form);
  const [open, setOpen] = React.useState(false);

  const handleChange = (id: string, value: string) => {
    dispatch(updateField({ id, value }));
  };
  const handleBlur = (id: string, isEmpty: boolean) => {
    dispatch(updateError({ id, isEmpty }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true)
  }
  return (
    <Card sx={{
      display: 'flex', justifyContent: "center", maxWidth: '600px', alignItems: 'center', margin: '100px auto', boxShadow: 4, padding: 3
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start", gap: 10, }
      } >
        <Box display={'flex'} flexWrap={'wrap'} rowGap={2} justifyContent={'space-between'}>
          {fields.map((field) => {
            return (
              <Fragment key={field.id}>
                <CustomInput field={field} onChange={handleChange}
                  onBlur={handleBlur} />
              </Fragment>
            )
          })}
        </Box>
        <Button id={button.id} type={button.type} disabled={button.disabled} variant="contained">{button.title}</Button>
      </form >
      <Modal open={open} setOpen={setOpen} />
    </Card >
  );
};

export default Form;