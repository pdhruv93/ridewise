import React from 'react';
import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userDataAtom } from '../LoginButton';
import { toastAtom } from '../ToastNotification';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { validationSchema } from './validator';
import ChipInput from '../ChipInput';
import DaySelector from '../DaySelector';

export default function Form() {
  const userData = useRecoilValue(userDataAtom);
  const [, setToastData] = useRecoilState(toastAtom);

  const formik = useFormik({
    initialValues: {
      startPoint: '',
      endPoint: '',
      days: [],
      zipCodes: [],
      maxSharingAllowed: 1,
    },
    validationSchema,
    onSubmit: formValues => {
      axios
        .post(
          `${process.env.REACT_APP_MONGO_DB_BASE_URL}/addRoute?secret=${process.env.REACT_APP_REALM_SECRET}`,
          {
            ...formValues,
            creator: userData.googleId,
          }
        )
        .then(() => {
          console.log('New Route added DB side!!');
          setToastData({ message: 'New Route added DB side!!', isOpen: true });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            id="startPoint"
            name="startPoint"
            label="Start Point"
            variant="standard"
            defaultValue={formik.values.startPoint}
            onChange={formik.handleChange}
            error={
              formik.touched.startPoint && Boolean(formik.errors.startPoint)
            }
            helperText={
              formik.touched.startPoint && Boolean(formik.errors.startPoint)
                ? formik.errors.startPoint
                : 'Some landmark where you will start'
            }
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            id="endPoint"
            name="endPoint"
            label="End Point"
            variant="standard"
            defaultValue={formik.values.endPoint}
            onChange={formik.handleChange}
            error={formik.touched.endPoint && Boolean(formik.errors.endPoint)}
            helperText={
              formik.touched.endPoint && Boolean(formik.errors.endPoint)
                ? formik.errors.endPoint
                : 'Some landmark where you will end'
            }
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <ChipInput formikInstance={formik} />
        </Grid>

        <Grid item xs={12} md={12}>
          <DaySelector formikInstance={formik} />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            type="number"
            id="maxSharingAllowed"
            name="maxSharingAllowed"
            label="Max sharing"
            InputProps={{
              inputProps: {
                max: 5,
                min: 1,
              },
            }}
            defaultValue={formik.values.maxSharingAllowed}
            onChange={formik.handleChange}
            error={
              formik.touched.maxSharingAllowed &&
              Boolean(formik.errors.maxSharingAllowed)
            }
            helperText={
              formik.touched.maxSharingAllowed &&
              Boolean(formik.errors.maxSharingAllowed)
                ? formik.errors.maxSharingAllowed
                : 'Max no. of people you want to share ride with'
            }
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
