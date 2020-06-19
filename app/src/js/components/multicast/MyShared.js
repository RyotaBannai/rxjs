import React, {useState, useEffect} from "react";

import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

const source = timer(1000);
const example = source.pipe(
    tap(() => console.log('***SIDE EFFECT***')),
    mapTo('***RESULT***')
);

//share observable among subscribers
const sharedExample = example.pipe(share());


export default function MyShared (props){
    useEffect(() => {

        const subscribe = example.subscribe(val => console.log(val));
        const subscribeTwo = example.subscribe(val => console.log(val));

        console.log('*******'); // comes first

        const subscribeThree = sharedExample.subscribe(val => console.log(val));
        const subscribeFour = sharedExample.subscribe(val => console.log(val));

    },);
    return(
        <div className="col-md-4"></div>
    )
}