import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Sidebar() {
    return (
        <Box sx={{ display:'flex', boxShadow: 10, position: 'absolute', flexGrow: 1, bgcolor: '#4c93d9', width: 200, height: 1080 }}>
          <Tabs
            orientation="vertical"
            aria-label="vertical tab"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
          </Tabs>
        </Box>
    )
}