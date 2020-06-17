import React, {useState, useEffect} from "react";
import { Subject } from 'rxjs';

export default function MyOp1 (props){
    useEffect(() => {
        const subject = new Subject();
        subject.subscribe( // Observer 1
            data => console.log(`Thank you for subscribing me, ${data} from Clark`),
        );
        subject.subscribe( // Observer 2
            data => console.log(`thank you for subscribing me, ${data} from Cristine`),
        );
        subject.next(['Customer1', 'Customer2']);
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}