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
import Sidebar from './components/Sidebar';

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

        <Sidebar/>
        
        <Box sx={{ display: 'flex', justifyContent:"center", paddingTop:"20px", gap: 2, flexDirection: 'column', alignItems: 'center', width:1261+200}}>
          <LineChart chartData={userData}/>
          <BarChart chartData={userData}/>

        </Box>
      </div>
    </div>
  );
}

export default App; 