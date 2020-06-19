import React, {useState, useEffect} from "react";

import { of, from } from 'rxjs';
import { tap, concatMap, map, groupBy, toArray, concat, mergeTo, mergeMap, mapTo } from 'rxjs/operators';

const records = [
    { id: 'a', category: 1 },
    { id: 'b', category: 2 },
    { id: 'd', category: 1 },
    { id: 'e', category: 2 },
];

/*
* Objective: transform records to below
* const result = [
*    // Category 1
*    { key: 1, value: { id: 'a', category: 1 } },
*    { key: 1, value: { id: 'd', category: 1 } },
*    // Category 2
*    { key: 2, value: { id: 'b', category: 2 } },
*    { key: 2, value: { id: 'e', category: 2 } },
* ];
* */

export default function GroupingEx001 (props){
    useEffect(() => {
        const observables = from(records);
        const piped = observables.pipe(
            groupBy(entry => entry.category),
            mergeMap(group =>  group.pipe(toArray())), // an observable group to an array of objects
            mergeMap(array_of_group => from(array_of_group).pipe(
                map(item => ({ key: item.category, value: item }))
            ))
        );
        piped.subscribe(result => {console.log(result)});
    },);
    return(<div className="col-md-4">Mapping</div>)
}