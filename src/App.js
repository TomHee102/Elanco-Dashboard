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
import elanco from './icons/elanco.ico';
import Sidebar from './components/Sidebar';
import Outputdata from './components/Outputdata';
import PlotAnalysis from './components/Outputdata';

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
            <Toolbar variant="dense" sx={{justifyContent: 'flex-end', height: '56px', width:"calc(100%-150px)" }}>
              <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, justifyContent:'center', alignItems: 'center', marginLeft:"225px"}}>
                Current plot is {selectedPlot}
              </Typography>
              <img src={elanco} width="125px" height="56px" alt="Logo" />
            </Toolbar>
          </AppBar>
        </Box>
        <Sidebar getSelectedPlot={getSelectedPlot} />
        


        

      
        {selectedPlot && (
      <>
        <Outputdata plot={selectedPlot}/>
      </>
    )}
    {!selectedPlot && <Box sx={{height:"100%"}}>
                <Typography variant="h6" color="inherit" component="div" sx={{marginLeft:"150px", paddingTop:"400px"}}>
                please select a plot
              </Typography>
    </Box>}


        

      </div>
    </div>
  );
}

export default App; 