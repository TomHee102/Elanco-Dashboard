import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"

export default function Outputdata({plot}) {
    

    //store the parameter passed to Fetchdata in a variable


    const [chartData, setChartData] = React.useState([]);

        useEffect(() => {
        async function fetchData() {
            //if start date is given without end date, then end date is set to current date and if end date is given without start date, then start date is set to 1st Jan 2022. if no date is given, then the start date is set to 1st Jan 2022 and end date is set to 31st Dec 2022
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
                backgroundColor: "rgba(75,255,192,1)",
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


