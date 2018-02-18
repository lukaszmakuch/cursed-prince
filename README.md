This repository contains an example of a stateful object built using [visual automata-based programming](https://rosmaro.js.org).

```javascript
> model.introduceYourself(); 
'I am The Prince of Rosmaro!'

> model.eat({dish: 'yakisoba'}); 
undefined

> model.introduceYourself();
'I am The Prince of Rosmaro!'

> model.eat({dish: 'pizza'});
undefined

> model.introduceYourself();
'Ribbit! Ribbit!'
```