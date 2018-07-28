import rosmaro from 'rosmaro';
import {partialReturns, typeHandler, defaultHandler} from 'rosmaro-binding-utils';

const handler = plan => partialReturns(typeHandler({defaultHandler})(plan));

const graph = {
  "main": {
    "type": "graph",
    "nodes": {
      "Prince": "Prince",
      "Frog": "Frog"
    },
    "arrows": {
      "Prince": {
        "ate a pizza": {
          "target": "Frog",
          "entryPoint": "start"
        }
      }
    },
    "entryPoints": {
      "start": {
        "target": "Prince",
        "entryPoint": "start"
      }
    }
  },
  "Prince": {
    "type": "leaf"
  },
  "Frog": {
    "type": "leaf"
  }
};

const Frog = handler({
  INTRODUCE_YOURSELF: () => "Ribbit! Ribbit!",
});

const Prince = handler({
  INTRODUCE_YOURSELF: () => "I am The Prince of Rosmaro!",
  EAT: ({action}) => action.dish === 'pizza' ? {arrow: 'ate a pizza'} : undefined
});

const bindings = {
  'main': {handler: defaultHandler},
  'main:Prince': {handler: Prince},
  'main:Frog': {handler: Frog},
};

const model = rosmaro({graph, bindings});

let state;
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