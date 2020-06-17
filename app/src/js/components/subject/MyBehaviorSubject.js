import React, {useState, useEffect} from "react";
import { BehaviorSubject } from 'rxjs';

export default function MyBehaviorSubject (props){
    useEffect(() => {
        const subject = new BehaviorSubject(0); // this is default value... so two executions total
        subject.subscribe( // Observer 1
            data => console.log(`Thank you for subscribing me, ${data} from Clark`),
        );

        subject.next(1);
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}