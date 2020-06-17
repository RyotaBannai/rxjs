import React, {useState, useEffect} from "react";
import MyAnimationFrame from '../components/animation/AnimationFrame'

export const Playground = props => {
    const [state, setState] = useState([]);
    useEffect(()=> {

    }, []);

    return (<div>
        <MyAnimationFrame />
    </div>)
};