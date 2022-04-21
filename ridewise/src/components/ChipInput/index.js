import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

export default function ChipInput(props) {
  const formik = props.formikInstance;

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
      onChange={(e, value) => (formik.values.zipCodes = value)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="standard"
          label="Zip Codes"
          error={formik.touched.zipCodes && Boolean(formik.errors.zipCodes)}
          helperText={
            formik.touched.zipCodes && Boolean(formik.errors.zipCodes)
              ? formik.errors.zipCodes
              : 'Add all possible zip codes which might fall into your route'
          }
        />
      )}
    />
  );
}
