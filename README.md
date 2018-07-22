This repository contains an example model built using [visual automata-based programming](https://rosmaro.js.org).

To run it, install the dependencies (`npm i`) and then simply type `npm start`.

```javascript
// Part of the index.js file:
let state;
[
  {type: 'INTRODUCE_YOURSELF'},
  {type: 'EAT', dish: 'yakisoba'},
  {type: 'INTRODUCE_YOURSELF'},
  {type: 'EAT', dish: 'pizza'},
  {type: 'INTRODUCE_YOURSELF'}
].forEach(action => {
  const {state: newState, result} = model({state, action});
  state = newState;
  console.log(result);
});
// I am The Prince of Rosmaro!
// undefined
// I am The Prince of Rosmaro!
// undefined
// Ribbit! Ribbit!
```