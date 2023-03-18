import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import PlotForm from './PlotForm.js';

export default function Sidebar() {
  return(
      <>
        <Box sx={{ boxShadow: 10, position: 'absolute', flexGrow: 1, bgcolor: '#4c93d9', width: 150, height: 1080, textAlign: 'left',}}>
          <div><PlotForm /></div>         
        </Box>
      </>
    );
}