import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import Fetchdata from "./Fetchdata";
import { Bar } from "react-chartjs-2"

export default function Outputdata() {
    //the data is in a nested array, how can I fetch the PH field from the data that I have imported and log in the console?

    var plot = "plot1";

    const [jsonData, setJsonData] = Fetchdata(plot);
    //store the parameter passed to Fetchdata in a variable
    const [ph, setPh] = React.useState([]);
    const [date, setDate] = React.useState([]);
    const [temp, setTemp] = React.useState([]);

    React.useEffect(() => {
        const phArray = [];
        const dateArray = [];
        const avgTemp = [];

        jsonData.map((data) => {
            for(let i = 0; i < data.length; i++){
            phArray.push(data[i].PH);
            dateArray.push(data[i].Date);
            avgTemp.push(data[i].Temp_C)
            }
        });

        setPh(phArray);
        setDate(dateArray);
        setTemp(avgTemp);
    }, [jsonData]);




    const lineChart = (
        <Line
            height={400}
            width={900}
            data={{
                labels: date.map((data) => data.value),
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

    const BarChart = (
        <Bar
            height={400}
            width={900}
            data={{
                labels: date.map((data) => data.value),
                datasets: [
                    {
                        data: temp,
                        label: "Temperature",

                    },
                ]

            }}
        />
    )


    return (
        <div>
            <h1>pH for {plot}</h1>
            {lineChart}
            {BarChart}

        </div>
    )
}

