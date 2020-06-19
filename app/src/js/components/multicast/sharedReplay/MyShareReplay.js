import React, {useState, useEffect} from "react";

import { Subject } from 'rxjs';
import { tap, pluck, shareReplay } from 'rxjs/operators';

// simulate url change with subject
const routeEnd = new Subject();

// grab url and share with subscribers
const lastUrl = routeEnd.pipe(
    tap(_ => console.log('executed')),
    pluck('url'),
    shareReplay(1), // default is all values so pick the last 1 stream.
);


export default function MyShareReplay (props){
    useEffect(() => {

        const initialSubscriber = lastUrl.subscribe(console.log);  // initial subscriber required
        routeEnd.next({data: {}, url: 'my-path'});  // simulate route change
        const lateSubscriber = lastUrl.subscribe(console.log);  // nothing logged

    },);
    return(
        <div className="col-md-4"></div>
    )
}