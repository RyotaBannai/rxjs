import React, {useState, useEffect} from "react";
import MyAsyncSubject from '../components/subject/MyAsyncSubject'

export const Main = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <MyAsyncSubject/>
    </div>)
};