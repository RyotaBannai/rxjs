import React, {useState, useEffect} from "react";
import '../../sass/Child.scss';

import { fromEvent } from 'rxjs';
import { find } from 'rxjs/operators';

export default function MyfromEvent (props){
    const [state, setState] = useState(false);
    useEffect(()=> {
        const clicks = fromEvent(document, 'click');
        const result = clicks.pipe(find(event => event.target.id === '_button'));
        result.subscribe(x => clicked(x));
    },);
    const clicked = x => {
        console.log(x);
        console.log('Button Clicked.');
    };
    return(
        <div className="col-md-4">
            <button id='_button' type="button" className="btn btn-dark">Click Me!</button>
        </div>
    )
}