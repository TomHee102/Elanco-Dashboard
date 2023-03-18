import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, InputLabel, TextField } from '@mui/material';
import {useState} from 'react';

export default function PlotForm() {
    
    const [requestedPlotId, setRequestedPlotId] = useState('');
    const [plotId, setPlotId] = useState([])

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

    return (
      <Box>
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
          onClick={secondEvent}
        >
          Add Plot
        </Button>

        
          {
            plotId.map((val) => {
              return(
                <Tabs
                  orientation="vertical"
                  aria-label="vertical tab"
                >
                    <Tab key={val} sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label={"Plot " + val} />
                </Tabs>
              );
            })
          }

      </Box>
    );
  }