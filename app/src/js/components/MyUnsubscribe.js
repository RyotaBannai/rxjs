import React, {useState, useEffect} from "react";
import '../../sass/Child.scss';
import { Observable } from 'rxjs';

export default function MyUnsubscribe (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        const observable = new Observable(subscriber => {
            // Keep track of the interval resource
            const intervalId = setInterval(() => {
                subscriber.next('hi');
            }, 1000);

            // Provide a way of canceling and disposing the interval resource
            return function unsubscribe() {
                clearInterval(intervalId);
            };
        });
        const subscription =  observable.subscribe(x => callOnce(x));
        const callOnce = x => {
            console.log(x);
            subscription.unsubscribe()
        };
    },);
    return(
        <div className="col-md-4">
            <h2>MyUnsubscribe</h2>
        </div>
    )
}