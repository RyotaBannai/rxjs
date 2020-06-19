import React, {useState, useEffect} from "react";
import { empty, interval, of, concat, range } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

export default function MyOp1 (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        //const interval$ = interval(1000);
        // const result = interval$.pipe(
        //     mergeMap(x => x%2 ===1 ? of('a','b','c') : empty()),
        // );

        const timer = interval(1000).pipe(take(4));
        const sequence = range(1, 10);
        const result = concat(timer, sequence);
        result.subscribe(x => console.log(x))

    },);
    return(
        <div className="col-md-4">
        </div>
    )
}