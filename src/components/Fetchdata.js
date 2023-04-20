import axios from "axios";
import React from "react";

export default function Fetchdata(plotId) { //plotId is a string, not will be amended
    const [data, setData] = React.useState([]);
    const fetchdata = async () => {
        const response = await axios.get(`https://sampledata.elancoapps.com/data/plot/${plotId}`); //fetches the data from the api, specific plot for now
        setData(response.data);
    }
    React.useEffect(() => {
        fetchdata();
    }
    , []); //should fetching nce only

    return [data, setData];
}

