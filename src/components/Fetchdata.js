import axios from "axios";
import React from "react";

export default function Fetchdata() {
    const [data, setData] = React.useState([]);
    const fetchdata = async () => {
        const response = await axios.get("https://sampledata.elancoapps.com/data/plot/plot2");
        setData(response.data);
    }
    React.useEffect(() => {
        fetchdata();
    }
    , []); //should fetching nce only
}

