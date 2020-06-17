import React, {useState, useEffect} from "react";

import { fromEvent, interval } from 'rxjs';
import { buffer } from 'rxjs/operators';

export default function MyBuffer (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        const clicks = fromEvent(document, 'click');
        const intervalEvents = interval(1000);
        const buffered = intervalEvents.pipe(buffer(clicks));
        buffered.subscribe(x => console.log(x)); // buffers counting by your click intervals
    },);
    return(
        <div className="col-md-4">
            Buffer
        </div>
    )
}