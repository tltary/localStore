//import {getGroup, addGroup, editGroup, removeGroup, getItem, addItem, editItem, removeItem} from "./store.js"

import * as store from './store.js';

store.initStore();

console.log(store.getStore())

store.addGroup('test');
store.addItem('test','222','1');

