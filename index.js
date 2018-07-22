import rosmaro from 'rosmaro';

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

const main = ({children, action}) => Object.values(children)[0]({action});

const Frog = ({action, context}) => {
  switch (action.type) {
    case 'INTRODUCE_YOURSELF':
      return {result: "Ribbit! Ribbit!", arrows: [], context};
    default:
      return {result: undefined, arrows: [], context};
  }
};

const Prince = ({action, context, node}) => {
  switch (action.type) {
    case 'INTRODUCE_YOURSELF':
      return {result: "I am The Prince of Rosmaro!", arrows: [], context};
    case 'EAT':
      const arrows = action.dish === 'pizza'
        ? [[[node.id, 'ate a pizza']]]
        : [];
      return {result: undefined, arrows, context};
    default:
      return {result: undefined, arrows: [], context};
  }
};

const bindings = {
  'main': {handler: main},
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