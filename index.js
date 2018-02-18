import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';
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
        "ate pizza": {
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

const Frog = {
  introduceYourself: () => "Ribbit! Ribbit!"
};

const Prince = {
  introduceYourself: () => "I am The Prince of Rosmaro!",
  eat: ({dish}) => {
    if (dish === 'pizza') return {arrow: 'ate pizza'};
  }
};

const handlers = {Frog, Prince};

const storage = makeStorage();
const lock = makeLock();
const model = rosmaro({graph, handlers, storage, lock});

console.log(model.introduceYourself()); // I am The Prince of Rosmaro!
console.log(model.eat({dish: 'yakisoba'})); // undefined
console.log(model.introduceYourself()); // I am The Prince of Rosmaro!
console.log(model.eat({dish: 'pizza'})); // undefined
console.log(model.introduceYourself()); // Ribbit! Ribbit!
