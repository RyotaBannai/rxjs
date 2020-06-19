import React, {useState, useEffect} from "react";
import MyRepeatWhen from '../components/archive/MyRepeatWhen'

export const Playground = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <MyRepeatWhen />
    </div>)
};