import React, {useState, useEffect} from "react";
import MyOb1 from "../components/MyOb1";

export const Main = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <h1>Rxjs</h1>
        <MyOb1 />
    </div>)
};