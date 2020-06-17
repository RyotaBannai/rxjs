import React, {useState, useEffect} from "react";
import MyMulticast from '../components/multicast/MyMulticast'

export const Main = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <MyMulticast/>
    </div>)
};