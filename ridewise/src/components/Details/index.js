import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CustomStepper } from './CustomStepper';

export default function About() {
  return (
    <Box>
      <Card variant="outlined" sx={{ borderRadius: '20px', padding: '10px' }}>
        <CardContent>
          <Typography variant="h6">
            Simple, quick and safe way to commute together.
          </Typography>
          <Typography>
            ridewise connects people who wants to travel with drivers who have
            extra seats. Trusted carpooling. Verified profiles.
          </Typography>

          <CustomStepper />
        </CardContent>
      </Card>
    </Box>
  );
}
