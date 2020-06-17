import React, {useState, useEffect} from "react";
import {
    from,
    of,
    Subject,
    BehaviorSubject
} from 'rxjs'
import {
    filter,
    map,
    delay,
    mergeMap,
    debounceTime,
    distinctUntilChanged,
} from 'rxjs/operators';

const observable = from([1,2,3,4,5]);
const items = observable.pipe(
    filter(item => item > 2),
    mergeMap(item => from([item]).pipe(delay(500 * item))),
    map(item => item *2 ),
);

const subject = new BehaviorSubject(['pikachu']);
const subscriber = subject.pipe(
    filter(item => item.length > 0),
    debounceTime(500),
    distinctUntilChanged(),
    mergeMap(item => from(getPokemonByName(item))),
);
const getPokemonByName = async name => {
  const {results: allPokemons} = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100").then(res => res.json());
  return allPokemons.filter(pokemon => pokemon.name.includes(name));
};

const default_state = {
  count: 0,
};

const default_pokemon = {
  pokemon: [],
};

const useObservable = (subscriber, setter, state) => {
    useEffect(()=> {
        subscriber.subscribe(
            pokemon => setter({
                ...state,
                pokemon
            }),
            () => console.log('Error'),
            () => console.log('Completed')
        )
    }, [subscriber, setter]);
};

export const Main = props => {
    const [state, setState] = useState('');
    const [result, setResult] = useState(default_pokemon);
    const handleEvent = e => {
        let new_value = e.target.value;
        setState(new_value);
        subscriber.next(new_value);
    };
    useObservable(subscriber, setResult, result);
    return (<div>
        <input
            type='text'
            value={ state }
            onChange={ handleEvent }
        />
        <table className="table table-dark">
            <thead><tr scope="col">Name</tr></thead>
            <tbody>{
                result.pokemon.map(pokemon =>
                    <tr>
                        <td key={pokemon.name}><a href={pokemon.url}>{pokemon.name}</a></td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>)
};