import { Box, MenuItem, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Field } from '../../features/formSlice'
interface CustomInputProps {
  field: Field
  onChange: (id: string, value: string) => void
  onBlur: (id: string, isEmpty: boolean) => void
}
const CustomInput: FC<CustomInputProps> = ({ field, onChange, onBlur }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} width={field.width === 'half' ? 'calc(50% - 10px)' : '100%'}>
      {field.status && <TextField id={field.id} name={field.id} variant="outlined" size='small' type={field.type} label={field.title} required={field.validate}
        onChange={(e) => onChange(field.id, e.target.value)}
        value={field.value}
        onBlur={(e) => onBlur(field.id, !e.target.value)}
        select={field.type === 'select'}>
        {field.type === 'select' && field.options?.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
          )
        })}</TextField>}
      {!field.validate && <span style={{ color: 'red' }}>{field.validateError}</span>}

    </Box>)
}

export default CustomInput