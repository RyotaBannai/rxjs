import React, {useState, useEffect} from "react";
import MyOb1 from "../components/MyOb1";
import MyBuffer from '../components/MyBuffer'

export const Main = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <MyBuffer/>
    </div>)
};