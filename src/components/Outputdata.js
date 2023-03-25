import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"

export default function Outputdata({plot}) {
    //the data is in a nested array, how can I fetch the PH field from the data that I have imported and log in the console?

    //store the parameter passed to Fetchdata in a variable
    const [ph, setPh] = React.useState([]);
    const [date, setDate] = React.useState([]);
    const [temp, setTemp] = React.useState([]);
    const [humidity, setHumidity] = React.useState([]);


    React.useEffect(() => {
        async function fetchData() {
          const response = await fetch(`https://sampledata.elancoapps.com/data/plot/${plot}`);
          const data = await response.json();
      
          const phArray = [];
          const dateArray = [];
          const avgTemp = [];
          const avgHumidity = [];
      
          data.forEach((data) => {
            for (let i = 0; i < data.length; i++) {
              phArray.push(data[i].PH);
              dateArray.push(data[i].Date.value);
              avgTemp.push(data[i].Temp_C);
              avgHumidity.push(data[i].AVG_Humidity__);
            }
          });
      
          //sort the dates in chronological order, consider that the dates are in string format
          dateArray.sort((a, b) => {
            const dateA = new Date(a.value);
            const dateB = new Date(b.value);
            return dateA - dateB;
          });
      
          // Store the fetched data in local storage
          const storedData = { phArray, dateArray, avgTemp, avgHumidity };
          localStorage.setItem(plot, JSON.stringify(storedData));
      
          setPh(phArray);
          setDate(dateArray);
          setTemp(avgTemp);
          setHumidity(avgHumidity);
        }
      
        // Check if the data is already stored in local storage
        const storedData = JSON.parse(localStorage.getItem(plot));
        if (storedData) {
          setPh(storedData.phArray);
          setDate(storedData.dateArray);
          setTemp(storedData.avgTemp);
          setHumidity(storedData.avgHumidity);
        } else {
          fetchData();
        }
      }, [plot]);
      




    const lineChart = (
        <Line
            height={400}
            width={800}
            data={{
                labels: date,
                datasets: [
                    {
                        data: ph,
                        label: "PH",
                        borderColor: "#3333ff",
                        fill: true,
                    },
                ],
            }}


        />
    );

    const BarChart_Temp = (
        <Bar
            height={400}
            width={800}
            data={{
                labels: date,
                datasets: [
                    {
                        data: temp,
                        label: "Temperature",

                    },
                ]

            }}
        />
    )

    const BarChart_Humidity = (
        <Bar
            height={400}
            width={800}
            data={{
                labels: date,
                datasets: [
                    {
                        data: humidity,
                        label: "Humidity",

                    },
                ]

            }}
        />
    )



    return (
        <div>
            {lineChart}
            {BarChart_Temp}
            {BarChart_Humidity}
        </div>
    )
}

