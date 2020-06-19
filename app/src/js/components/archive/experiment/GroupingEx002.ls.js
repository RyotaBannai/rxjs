import React, {useState, useEffect} from "react";
import { of, from } from 'rxjs';
import { tap, map, groupBy, toArray, mergeMap } from 'rxjs/operators';

// https://stackoverflow.com/questions/56702361/how-to-groupby-by-two-fields-from-array-using-rxjs

const dummy_data = [
    {
    category : "Printer",
    manDate : "02/01/2019",
    amount : 90
    },
    {
        category : "Printer",
        manDate : "02/01/2019",
        amount : 100
    },
];

const grouping_twice = from(dummy_data)
    .pipe(
        groupBy(// Group them by category and return the appropriate Arrays
            val => val.category
        ),
        mergeMap(group => {
            return group.pipe(toArray());
        }),
        mergeMap((array) => {// Take each from above array and group each array by manDate
            return from(array).pipe(groupBy(
                val => val.manDate,
                ),
                mergeMap(group => {
                    return group.pipe(toArray()); // return the group values as Arrays
                })
            );
        }),
        map((val) => { //For each array returned , calculate the sum and map it to the Object you wanted
            let amount = 0;
            val.map(v => {
                amount = amount + v.amount;
            });
            return {category: val[0].category, manDate: val[0].manDate, amount};
        }),
        toArray() //finally combine all returned objects to an array
    ).subscribe(
    val => console.log(val)
);