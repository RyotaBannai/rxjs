import React, {useState, useEffect} from "react";
import '../../sass/Child.scss';
import { Observable } from 'rxjs';

export default function MyOb1 (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        const observable = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);
            setTimeout(() => {
                subscriber.next(4);
                subscriber.complete();
            }, 1000);
        });

        console.log('just before subscribe');
        observable.subscribe({
            next(x) { console.log('got value ' + x); },
            error(err) { console.error('something wrong occurred: ' + err); },
            complete() { console.log('done'); }
        });
        console.log('just after subscribe');
    },);
    return(
        <div className="col-md-4">
        </div>
    )
}