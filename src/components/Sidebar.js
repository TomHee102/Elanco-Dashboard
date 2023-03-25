import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Outputdata from './Outputdata';

export default function Sidebar({getSelectedPlot}) {
  const [requestedPlotId, setRequestedPlotId] = React.useState('');
  const [plotId, setPlotId] = React.useState([])

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
        <Box sx={{ boxShadow: 10, position: 'absolute', flexGrow: 1, bgcolor: '#4c93d9', width: 150, height: 1080, textAlign: 'left',}}>
          <TextField
            helperText="Enter the Id of Plot"
            hiddenLabel
            type="number"
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
