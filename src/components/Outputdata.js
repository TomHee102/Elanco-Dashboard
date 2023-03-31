import React, { useEffect } from "react";
import { Line, Scatter } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"
import crops from '../data/Crop.json';




function PlotAnalysis(props) {
    const chartData = props.chartData;
  
    // Define the crop type and its ranges
    const cropType = "Wheat";
    const ranges = {
      ph: [6, 6.8],
      temp: [20, 30],
      humidity: [40, 60],
      light: [35, 65],
    };
  
    // Analyze each data point and calculate the profit
    const analyzedData = chartData.map((data) => {
      // Get the date and data points for this data point
      const { date, ph, temp, humidity, light } = data;
  
      // Check if the data points fall within the corresponding range
      const isWithinRange =
        ph.every((value) => value >= ranges.ph[0] && value <= ranges.ph[1]) &&
        temp.every((value) => value >= ranges.temp[0] && value <= ranges.temp[1]) &&
        humidity.every(
          (value) => value >= ranges.humidity[0] && value <= ranges.humidity[1]
        ) &&
        light.every((value) => value >= ranges.light[0] && value <= ranges.light[1]);
  
      // Calculate the profit if the data points are within range
      const costAndMaintenance = "£100";
      const yield_ = "£450";
      const growthTimeInDays = 45;
      const profit =
        isWithinRange &&
        parseFloat(yield_.slice(1)) -
          parseFloat(costAndMaintenance.slice(1)) /
            (365 / growthTimeInDays);
  
      return {
        date,
        isWithinRange,
        profit,
      };
    });

    console.log(analyzedData)
  
    // Render the analyzed data
    return (
      <div>
        <h2>Plot Analysis</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Within Range</th>
              <th>Profit</th>
              <th>Crop</th>
            </tr>
          </thead>
          <tbody>
            {analyzedData.map((data) => (
              <tr key={data.date}>
                <td>{data.date}</td>
                <td>{data.isWithinRange ? "Yes" : "No"}</td>
                <td>{data.profit ? `£${data.profit.toFixed(2)}` : "-"}</td>
                <td>{cropType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Total Profit</h1>
        <h2>
            £
            {analyzedData
                .filter((data) => data.profit)
                .reduce((total, data) => total + data.profit, 0)
                .toFixed(2)}
        </h2>
      </div>
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
                },
            ],
            options: {
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
                    responsive: true,
                }
                }}
            />
            );




    return (
        <div>
            {BarChart_PH}
            {BarChart_Temp}
            {BarChart_Humidity}
            {BarChart_Light}
            <PlotAnalysis chartData={chartData} />
        </div>
    )
}


