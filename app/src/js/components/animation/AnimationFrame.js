import React, {useState, useEffect} from "react";

// Perform task when window.requestAnimationFrame would fire

import { fromEvent, animationFrameScheduler } from 'rxjs';
import { find,tap } from 'rxjs/operators';

const clickEvent = fromEvent(document, 'click').pipe(
    find(event => event.target.id === '_target-div'),
    tap(console.log),
);

const biggerElement = limit => {
    let div = document.querySelector('#_target-div');
    animationFrameScheduler.schedule(function(height = 20) {
        let element_height = div.computedStyleMap().get('height').value;  // get as number instead of XXpx
        if(limit > element_height) this.schedule(height + 1);  // `this` references currently executing Action, which we reschedule with new state
        div.style.height= height + "px";
    }, 0, 0);
};

export default function MyAnimationFrame (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        clickEvent.subscribe(
            _ => biggerElement(100),
            _ => console.log('error'),
            _ => console.log('completed'),
        );
    }, );
    return(
        <div className="col-md-4">
            <div
                id='_target-div'
                style={{ height: "20px", backgroundColor: 'rebeccapurple', color: 'white' }}
            >this is div height 20px</div>
        </div>
    )
}