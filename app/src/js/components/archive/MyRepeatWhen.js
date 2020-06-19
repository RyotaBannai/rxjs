import React, {useState, useEffect} from "react";

import { of, fromEvent } from 'rxjs';
import { repeatWhen } from 'rxjs/operators';

const source = of('Repeat message');
const documentClick$ = fromEvent(document, 'click');

const default_state = {
    message_list: [],
    users: [],
};
function Counter (initial_count = 0) {
    let _uuid = initial_count;
    Object.defineProperty(this,"uuid", {
        get: function() { return ++_uuid; },
    })
}

const counter = new Counter(10000);

export default function MyRepeatWhen (props){
    const [state, setState] = useState(default_state);

    useEffect(()=> {
        source.pipe(repeatWhen(() => documentClick$) // add notifier to let observable know when to repeat.
        ).subscribe(data => {
            setState( prevState => ({
                ...prevState,
                message_list: [...prevState.message_list, data]
            }));
            /*
            * // or use this:
            * setState(state.message_list.concat([data]))
            *
            * */


            // this is how you can go deep down the rabbit hole;)
            // console.log(state)
            // data => {
            //     setState( undefined_value => ({
            //         ...state,
            //         message_list: state.message_list.push(data),
            //     }));
            //     console.log(state)
            // }
            // this leads you to see strange outcome: although state changes its values, jsx holds only the array's length increasing

        })
    }, []);
    return(
        <div className="col-md-4">
            { state.message_list.map(message =>
                <p
                    key={counter.uuid}
                > {message} </p>)}
        </div>
    )
}