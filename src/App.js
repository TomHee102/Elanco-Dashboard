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

        <LineChart chartData={userData}/>
      </div>
    </div>
  );
}

export default App; 