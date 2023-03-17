import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Sidebar() {
    return (
        <Box sx={{ boxShadow: 10, position: 'absolute', flexGrow: 1, bgcolor: '#4c93d9', width: 150, height: 1080, textAlign: 'left',}}>
          <Tabs
            orientation="vertical"
            aria-label="vertical tab"
          >
            <Tab sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label="Item One" />
            <Tab sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label="Item Two" />
            <Tab sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label="Item Three" />
            <Tab sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label="Item Four" />
            <Tab sx={{"&:hover":{backgroundColor: 'white', boxShadow: 10}}} label="Item Five" />
          </Tabs>
        </Box>
    )
}