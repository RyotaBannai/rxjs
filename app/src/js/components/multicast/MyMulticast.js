import React, {useState, useEffect} from "react";

import { from, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

export default function MyMulticast (props){
    useEffect(() => {
        const source = from([1, 2, 3]);
        const subject = new Subject();
        const multicasted = source.pipe(multicast(subject));

// These are, under the hood, `subject.subscribe({...})`:
        multicasted.subscribe({
            next: (v) => console.log(`observerA: ${v}`)
        });
        multicasted.subscribe({
            next: (v) => console.log(`observerB: ${v}`)
        });

// This is, under the hood, `source.subscribe(subject)`:
        multicasted.connect();
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}