# Simple store in localstorage

## First
add store in ./src/store.js
like this
```js
import * as store from './store.js';
```
and change you secret key to produiction in ./src/tuple.js
and init you store
```js
store.initStore() // if you need dev version
store.initStore(true) // if you need production version and crypto cipher
```

## Methods

```js
getStore() // get you actualy store
getGroup(nameGroup) // get you group by name
addGroup(nameGroup) // add group by name
removeGroup(nameGroup) // remove group by name
getItem(nameGroup, nameItem) // get you item in group
addItem(nameGroup, nameItem, textItem) // add new item and his value in group
editItem(nameGroup, nameItem, newValue) // replace value item in group
removeItem(nameGroup, nameItem) // remove item in group by name item
```

⚠️⚠️⚠️ importantly, all parameters in the methods are required