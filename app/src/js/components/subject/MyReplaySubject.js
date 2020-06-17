import React, {useState, useEffect} from "react";
import { ReplaySubject } from 'rxjs';

export default function MyOp1 (props){
    useEffect(() => {
        const subject = new ReplaySubject(2);
        subject.subscribe( // Observer 1
            data => console.log(`Thank you for subscribing me, ${data} from Clark`),
        );
        subject.next(1);
        subject.next(2);
        subject.subscribe( // Observer 1
            data => console.log(`Thank you for subscribing me, ${data} from Cristine`),
        );
        subject.next(3);
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}