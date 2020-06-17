import React, {useState, useEffect} from "react";
import { AsyncSubject } from 'rxjs';

export default function MyAsyncSubject (props){
    useEffect(() => {
        const subject = new AsyncSubject();
        subject.subscribe( // Observer 1
            data => console.log(`Thank you for subscribing me, ${data} from Clark`),
            ()=>{},
            ()=>{console.log('completed!')},
        );
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}