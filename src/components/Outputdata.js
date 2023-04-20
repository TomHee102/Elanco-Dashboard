import React, { useEffect } from "react";
import { Line, Scatter } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"
import cropData from '../data/Crop.json';
import { Pie } from "react-chartjs-2";
import { Box} from "@mui/material";
import {Pagination} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from "@mui/x-data-grid";


function PlotAnalysis(props) {
  const chartData = props.chartData;
  const cropsData = cropData;
  var profit = 0;
  
  // Define the crop type and its ranges
  const ranges = {};
  cropsData.forEach(crop => {
    ranges[crop.cropType] = {
      ph: crop.phRange,
      temp: crop.tempRange,
      humidity: crop.humidityRange,
      light: crop.lightRange,
      costAndMaintenance: crop.costAndMaintenance,
      yield: crop.yield,
      growthTimeInDays: crop.growthTimeInDays
    };
  });

  // initialize the crop count object
  const cropCount = {};

  //iterate through chartData and ranges, compare the values and return the crop type for each data point
  const cropType = chartData.map((data) => {
    
    for (const crop in ranges) {
      if (
        data.ph >= ranges[crop].ph[0] &&
        data.ph <= ranges[crop].ph[1] &&
        data.temp >= ranges[crop].temp[0] &&
        data.temp <= ranges[crop].temp[1] &&
        data.humidity >= ranges[crop].humidity[0] &&
        data.humidity <= ranges[crop].humidity[1] &&
        data.light >= ranges[crop].light[0] &&
        data.light <= ranges[crop].light[1]
      ) {
        // increment the count for the crop
        if (cropCount[crop]) {
          cropCount[crop]++;
        } else {
          cropCount[crop] = 1;
        }

        //convert yield to number, consider that there is a $ sign in the data
        profit = Number(ranges[crop].yield.replace(/[^0-9.-]+/g,"")) - Number(ranges[crop].costAndMaintenance.replace(/[^0-9.-]+/g,""));

        return (
          //return the name of the crop and the yield next to it'
          <div key={crop}>
            <h3>Crop Type: {crop}</h3>
            <h3>Yield: {ranges[crop].yield}</h3>
            <h3>costAndMaintenance: {ranges[crop].costAndMaintenance}</h3>
          </div>
        );
      }
    }
  });

  // create a piechart with the different crops that can be grown in the plot
  const cropCountItems = Object.entries(cropCount).map(([crop, count]) => (
    <div key={crop}>
      <h3>Crop Type: {crop}</h3>
      <h3>Count: {count}</h3>
    </div>
  ));

  const [selectedCrop, setSelectedCrop] = React.useState("");
  const [selectedYield, setSelectedYield] = React.useState(0);
  const [selectedCost, setSelectedCost] = React.useState(0);
  const [selectedProfit, setSelectedProfit] = React.useState(0);
  const [selectedGrowTime, setSelectedGrowTime] = React.useState(0);


  const cropLabels = Object.keys(cropCount);
  const cropValues = Object.values(cropCount);

  
  const pieChart = (
    <Pie
      data={{
        labels: cropLabels,
        datasets: [
          {
            label: "Crop Count",
            data: cropValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
  




  return (
    <Box sx={{maxWidth: "100%", maxHeight: "512px"}}>
  {pieChart}
  <div>
    <h2>Select a Crop:</h2>
    <select onChange={(event) => {
      const selectedCrop = event.target.value;
      const selectedProfit = Number(ranges[selectedCrop].yield.replace(/[^0-9.-]+/g,"")) - Number(ranges[selectedCrop].costAndMaintenance.replace(/[^0-9.-]+/g,""));
      const selectedCost = ranges[selectedCrop].costAndMaintenance;
      const selectedYield = ranges[selectedCrop].yield;
      const selectedGrowTime = ranges[selectedCrop].growthTimeInDays;
      setSelectedCrop(selectedCrop);
      setSelectedCost(selectedCost);
      setSelectedYield(selectedYield);
      setSelectedGrowTime(selectedGrowTime);
      // update the selected crop's profit in the state
      setSelectedProfit(selectedProfit * cropCount[selectedCrop]);
    }}>
      {Object.keys(cropCount).map((crop) => (
        <option key={crop} value={crop}>{crop}</option>
      ))}
    </select>
    {selectedProfit && (
      <div>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Crop Type</TableCell>
              <TableCell align="right">Yield</TableCell>
              <TableCell align="right">Grow Time</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={selectedCrop}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {selectedCrop}
              </TableCell>
              <TableCell align="right">{selectedYield}</TableCell>
              <TableCell align="right">{selectedGrowTime} days</TableCell>
              <TableCell align="right">{selectedCost}</TableCell>
              <TableCell align="right">£{selectedProfit}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </div>
      

    )}
  </div>
</Box>


  );
}




  
export default function Outputdata({plot}) {

    

    //store the parameter passed to Fetchdata in a variable


    const [chartData, setChartData] = React.useState([]);

        useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://sampledata.elancoapps.com/data/plot/${plot}`);
            
            const data = await response.json();

            const groupedData = {}; // Create an empty object to group data by date

            data.forEach((data) => {
              for (let i = 0; i < data.length; i++) {
                const date = data[i].Date.value;
                if (!groupedData[date]) {
                  groupedData[date] = {
                    ph: [],
                    temp: [],
                    humidity: [],
                    light: [],
                  };
                }
                groupedData[date].ph.push(data[i].PH);
                groupedData[date].temp.push(data[i].Temp_C);
                groupedData[date].humidity.push(data[i].AVG_Humidity__);
                groupedData[date].light.push(data[i].AVG_Light__);
              }
            });
            
            // Sort the dates in chronological order
            const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

            // Map the sorted dates to an array of objects with date and data points
            const chartData = sortedDates.map((date) => ({
            date,
            ph: groupedData[date].ph,
            temp: groupedData[date].temp,
            humidity: groupedData[date].humidity,
            light: groupedData[date].light,
            }));

            // Store the fetched data in local storage
            localStorage.setItem(plot, JSON.stringify(chartData));

            setChartData(chartData);
        }

        // Check if the data is already stored in local storage
        const storedData = JSON.parse(localStorage.getItem(plot));
        if (storedData) {
            setChartData(storedData);
        } else {
            fetchData();
        }
        }, [plot]);

        //create a const DateRangePicker which will allow the user to select a date range from the existing chart data and when selected, all the data outside the selected range will be removed from the chartData array. make the picker from scratch
        const [startDate, setStartDate] = React.useState("");
        const [endDate, setEndDate] = React.useState("");

        //handle filter but ensure that only the original chartData is filtered and not the filtered chartData
        const handleFilter = () => {
          const originalChartData = JSON.parse(localStorage.getItem(plot));

          
          // Filter the copy of chartData
          const filteredData = originalChartData.filter((data) => {
            return data.date >= startDate && data.date <= endDate;
          });
        
          // Set the filteredData state variable to the filtered data
          setChartData(filteredData);
        };


        const DateRangePicker = (
          <div>
            <h2>Select a Date Range:</h2>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(event) => {
                  setStartDate(null); // add this line to reset the state
                  setStartDate(event.target.value);
                }}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(event) => {
                  setEndDate(null); // add this line to reset the state
                  setEndDate(event.target.value);
                }}
              />
              <button onClick={handleFilter}>Filter</button> 
            </div>
          </div>
        );

        const BarChart_PH = (
        <Bar
            data={{
            labels: chartData.map((data) => data.date ),
            datasets: [
                {
                data: //map over ph array and use first value only
                chartData.map((data) => data.ph[0]),
                label: "PH",
                backgroundColor: "red",
                
                },
            ],
            options: {
                maintainAspectRatio: false,
                responsive: true,

            }
            }}
        />
        );

        const BarChart_Temp = (
        <Bar
            data={{
            labels: chartData.map((data) => data.date),
            datasets: [
                {
                data: chartData.map((data) => data.temp[0]),
                label: "Temperature",
                backgroundColor: "orange"
                },
            ],
            options: {
                maintainAspectRatio: false,
                responsive: true,

            }
            }}
            
        />
        );

        const BarChart_Humidity = (
        <Bar
            data={{
            labels: chartData.map((data) => data.date),
            datasets: [
                {
                data: chartData.map((data) => data.humidity[0]),
                label: "Humidity",
                backgroundColor: "rgba(255,99,132,1)",
                },
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,

            }

            }}
        />
        );

        const BarChart_Light = (
            <Bar
                
                data={{
                labels: chartData.map((data) => data.date),
                datasets: [
                    {
                    data: chartData.map((data) => data.light[0]),
                    label: "Average Light",
                    backgroundColor: "rgba(100,99,132,1)",
                    },
                ],
                options: {
                    maintainAspectRatio: false,
                    responsive: true,

                }
                }}
            />
            );



      const [currentPage, setCurrentPage] = React.useState(1);
      const chartsPerPage = 2;
      
      const chartsToDisplay = [
        BarChart_PH,
        BarChart_Temp,
        BarChart_Humidity,
        BarChart_Light
      ];
      
      const startIndex = (currentPage - 1) * chartsPerPage;
      const endIndex = startIndex + chartsPerPage;
      const chartsOnCurrentPage = chartsToDisplay.slice(startIndex, endIndex);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      }


    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        flexDirection: 'row',
        flexWrap: 'wrap', 
      }}>
        <Box sx={{ 
          flex: 1,
          width: '100%',
          height: '100%',
          paddingLeft: '20px',
          marginLeft: '150px',
        }}>
          <Pagination
            sx={{paddingTop: '20px'}}
            paginationPosition="bottom"
            chartsPerPage={chartsPerPage}
            totalCharts={chartsToDisplay.length}
            count={Math.ceil(chartsToDisplay.length / chartsPerPage)}
            defaultPage={1}
            handlePageChange={handlePageChange}
            page = {currentPage}
            onChange={(event, value) => {
              handlePageChange(value);
            }
          }

          />
          {chartsOnCurrentPage}

        </Box>
        <Box sx={{ 
          flex: 1,
          minWidth: '300px',
          height: '500px',
          '@media (max-width: 1156px)': {
            marginLeft: '160px',
          },
          
        }}>
          {DateRangePicker}
          <PlotAnalysis chartData={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          
        </Box>
      </Box>
      
      
      
        
    )
                
}


