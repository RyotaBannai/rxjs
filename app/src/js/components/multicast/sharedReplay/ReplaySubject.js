import React, {useState, useEffect} from "react";
import { Subject, ReplaySubject } from 'rxjs';
import { pluck } from 'rxjs/operators';

export default function MyReplaySubject (props){
    useEffect(() => {
        // simulate url change with subject
        const routeEnd = new Subject();

        // instead of using shareReplay, use ReplaySubject
        const shareWithReplay = new ReplaySubject();

        // grab url and share with subscribers
        const lastUrl = routeEnd.pipe(
            pluck('url')
        )
            .subscribe(val => shareWithReplay.next(val));

        // simulate route change
        routeEnd.next({data: {}, url: 'my-path'});

        // subscribe to ReplaySubject instead
        // logged: 'my path'
        shareWithReplay.subscribe(console.log);
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}