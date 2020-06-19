import React, {useState, useEffect} from "react";

import { of, from } from 'rxjs';
import { tap, concatMap, interval, map } from 'rxjs/operators';

export default function Mapping (props){
    useEffect(()=> {
        /*
        * Objective: from subject [a,b] => a0, a1, b0, b1 w/o new Subject
        * */
        const observables = from(['a', 'b']);
        const piled = observables.pipe(
            concatMap(
                letter => from([0, 1]).pipe(
                    map(number => letter + number)
                )
            )
        );
        piled.subscribe(result => console.log(result));
    },);
    return(<div className="col-md-4">Mapping</div>)
}