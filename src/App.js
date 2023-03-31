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
import Fetchdata from './components/Fetchdata';
import Outputdata from './components/Outputdata';
import { Container } from '@mui/material';
import { Line } from 'react-chartjs-2';
function App() {
  const [userData, setUserData] = React.useState({
    labels: UserData.map((data) => data.id),
    datasets: [{
      label: 'Yield',
      data: UserData.map((data) => data.yield),
    }]
  })

  const [selectedPlot, setSelectedPlot] = React.useState('');

  function getSelectedPlot(sidebarData){
    setSelectedPlot(sidebarData);
  }

  return (
    <div>
      <div className='App'>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <AppBar position="static">
            <Toolbar variant="dense" sx={{justifyContent: 'flex-end', height: '56px', }}>
              <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginLeft: '150px'}}>
                Current plot is {selectedPlot}
              </Typography>
              <img src={elanco} width="125px" height="56px" alt="Logo" />
            </Toolbar>
          </AppBar>
        </Box>
        <Sidebar getSelectedPlot={getSelectedPlot} />


        

      <Box sx={{display:'flex', justifyContent:'left', alignItems:"flex-start", marginLeft:'125px', paddingLeft:"50px", }}>
        <div class="chart">
          <Outputdata plot={selectedPlot}/>
        </div>
          
        
      </Box>

        

      </div>
    </div>
  );
}

export default App; 