import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Outputdata from './Outputdata';
import OptionSelect from './OptionSelect';

export default function Sidebar({getSelectedPlot}) {
  const [requestedPlotId, setRequestedPlotId] = React.useState('');
  const [plotId, setPlotId] = React.useState([]);

  const firstEvent = (event) => {
    setRequestedPlotId(event.target.value);
  }

  const secondEvent = () => {
    if(requestedPlotId != '' && requestedPlotId > 0){
      setPlotId((prev)=>{
        return [...prev, requestedPlotId]
      });
    }    
    setRequestedPlotId('');
  }   
  
  return(
    <>
  <Box sx={{
    boxShadow: 10,
    position: 'fixed', // Change to fixed
    top: 0, // Specify top position
    left: 0, // Specify left position
    flexGrow: 1,
    bgcolor: '#4c93d9',
    width: 150,
    height: '100vh', // Use viewport height for full-height sidebar
    textAlign: 'left',
    }}>

    <OptionSelect />

    <TextField
      helperText="Enter the Id of Plot"
      hiddenLabel
      type="number"
      height= '200px'
      variant="filled" 
      value={requestedPlotId} 
      placeholder="Enter desired plot Id"
      onChange={firstEvent}

    />
    <Button
      fullWidth={true}
      onClick={secondEvent}
    >
      Add Plot
    </Button>

    {
      plotId.map((val) => {
        return(
          <li key={val}>
            <Button
              onClick={() => getSelectedPlot('plot'+val)}
              fullWidth={true}
            >

              Plot {val}
            </Button>
          </li>
        );
      })
    }        
  </Box>
</>

    );
}
