import React, {useState, useEffect} from "react";
import '../../sass/Child.scss';

import { fromEvent, interval } from 'rxjs';
import { window, mergeAll, map, take } from 'rxjs/operators';

export default function MyBuffer (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        const clicks = fromEvent(document, 'click');
        const sec = interval(1000);
        const result = clicks.pipe(
            window(sec),
            map(win => win.pipe(take(2))), // each window has at most 2 emissions
            mergeAll(),              // flatten the Observable-of-Observables
        );
        result.subscribe(x => console.log(x));
    },);
    return(
        <div className="col-md-4">
            Buffer
        </div>
    )
}