import React, { useEffect } from "react";
import { Line, Scatter } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"

export default function Outputdata({plot}) {


    const crops = [
        {
          name: "Wheat",
          ph: { min: 6, max: 6.8 },
          temp: { min: 20, max: 30 },
          humidity: { min: 40, max: 60 },
          light: { min: 35, max: 65 },
          costAndMaintenance: "£100",
          yield: "£450",
          growthTime: 45,
        },
        {
          name: "Rice",
          ph: { min: 6, max: 6.7 },
          temp: { min: 20, max: 27 },
          humidity: { min: 45, max: 75 },
          light: { min: 50, max: 70 },
          costAndMaintenance: "£50",
          yield: "£250",
          growthTime: 30,
        },
        {
          name: "Corn",
          ph: { min: 5.5, max: 7 },
          temp: { min: 26, max: 30 },
          humidity: { min: 50, max: 80 },
          light: { min: 35, max: 85 },
          costAndMaintenance: "£75",
          yield: "£400",
          growthTime: 90,
        },
        {
          name: "Barley",
          ph: { min: 6.5, max: 7 },
          temp: { min: 14, max: 20 },
          humidity: { min: 30, max: 60 },
          light: { min: 20, max: 50 },
          costAndMaintenance: "£150",
          yield: "£500",
          growthTime: 60,
        },
        {
          name: "Oats",
          ph: { min: 6.2, max: 6.6 },
          temp: { min: 15, max: 25 },
          humidity: { min: 25, max: 75 },
          light: { min: 10, max: 40 },
          costAndMaintenance: "£80",
          yield: "£300",
          growthTime: 30,
        },
      ];
      
    

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
                }}
            />
            );




    return (
        <div>
            {BarChart_PH}
            {BarChart_Temp}
            {BarChart_Humidity}
            {BarChart_Light}
        </div>
    )
}


