import * as React from 'react';
import './App.css';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import {UserData} from './Data';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import elanco from './icons/elanco.ico';
import { CssBaseline } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [userData, setUserData] = React.useState({
    labels: UserData.map((data) => data.id),
    datasets: [{
      label: 'Yield',
      data: UserData.map((data) => data.yield),
    }]
  })

  return (
    <div>
      <div className='App'>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <img src={elanco} width="125px" height="auto" alt="Logo"/>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ boxShadow: 10, position: 'absolute', flexGrow: 1, bgcolor: '#4c93d9', width: 200, height: 1080 }}>
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


        <Box sx={{ display: 'flex', justifyContent:"center", paddingTop:"20px", gap: 2}}>
          <LineChart chartData={userData}/>
          <BarChart chartData={userData}/>

        </Box>
      </div>
    </div>
  );
}

export default App; 