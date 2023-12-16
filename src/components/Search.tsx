import React, { useState, useMemo } from 'react';
import { fromFetch } from 'rxjs/fetch';
import { of, mergeMap, catchError, startWith } from 'rxjs';
import { $ } from 'react-rxjs-elements';
import { timer } from 'rxjs';

//export default function Search({ children, count: initialCount }){
 // const [data, setData] = useState(null);
 // const [count, setCount] = useState(initialCount);
//  const subscription = fromFetch(`https://chainlist-api.muzamint.com/api/v1/chainlist/${count}`
//        response.json().then(data => setData(JSON.stringify(data.meta)))
  
export default function Search
  ({ children, count: initialCount }){
    const [name, setName] = useState('999');

  // we need useMemo to ensure stream$ persist
  // between App re-renders
  const stream$ = useMemo(() =>
  fromFetch(`https://chainlist-api.muzamint.com/api/v1/chainlist/search/${name}`)
      .pipe(
        mergeMap(response => response.json().then(x => x.map((x:any) => (<p>👉 {x.meta.name}  ⚡ ID: {x.meta.id}
          <a href={`${x.meta.blockExplorers.default.url}`}>   📡 {`${x.meta.blockExplorers.default.url}`}</a>
        </p> ))).catch(e => console.error(e))),
        catchError(() => of('ERROR')),
        startWith('loading...')
      )
  , [name]);

//  return <div>Data: <$>{ stream$ }</$></div>


  return <>
      <div>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="search"
        />
        <p>{name}</p>
      </form>
    </div>

  <div className="counter-message">{children}</div>

  <div>Chains: <$>{ stream$ }</$></div>
  
  </>
}

