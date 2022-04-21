import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function DaySelector(props) {
  const formik = props.formikInstance;

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={weekDays}
      disableCloseOnSelect
      getOptionLabel={option => option}
      onChange={(e, value) => (formik.values.days = value)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={params => (
        <TextField
          fullWidth
          {...params}
          variant="standard"
          label="Days Selector"
          placeholder="Select all days when you use this route"
          error={formik.touched.days && Boolean(formik.errors.days)}
        />
      )}
    />
  );
}
