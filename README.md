This repository contains an example model built using [visual automata-based programming](https://rosmaro.js.org).

This branch uses [rosmaro-binding-utils](https://github.com/lukaszmakuch/rosmaro-binding-utils).

To run it, install the dependencies (`npm i`) and then simply type `npm start`.

```javascript
// Part of the index.js file:
[
  {type: 'INTRODUCE_YOURSELF'},
  {type: 'EAT', dish: 'yakisoba'},
  {type: 'INTRODUCE_YOURSELF'},
  {type: 'EAT', dish: 'pizza'},
  {type: 'INTRODUCE_YOURSELF'}
].forEach(action => console.log(
  ({state} = model({state, action})).result.data
));
// I am The Prince of Rosmaro!
// undefined
// I am The Prince of Rosmaro!
// undefined
// Ribbit! Ribbit!
```