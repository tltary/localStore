const CryptoJS = require("crypto-js");
import { secretKey } from './tuple.js';

const storage = localStorage;
let _debug = true;

const _console = (text, param) => {
    if (_debug) {
        console[param](text);
    }
}

const isValidText = (str) => {
    return typeof str === 'undefined' ? true : false;
}

const isValidObj = (group, name) => {
    let obj = decode(storage.getItem('storage'))
    if (typeof name === 'undefined') {
        return typeof obj[group] === "undefined" ? true : false;
    } else {
        return typeof obj[group][name] !== "undefined" ? true : false;
    }
}

const encode = (data) => {
    return _debug ? JSON.stringify(data) : CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
}

const decode = (data) => {
    let bytes = CryptoJS.AES.decrypt(data, secretKey);
    return _debug ? JSON.parse(data) : JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const initStore = (prod) => {
    if (prod) {
        _debug = false;
    }
    if (storage.length === 0) {
        _debug ? storage.setItem('storage', encode('{}')) : storage.setItem('storage', encode(JSON.parse('{}')));
        _console(`store init`, 'log');
    } else {
        let cacheData = decode(storage.getItem('storage'));
        if (typeof cacheData === 'object') {
            _console(`store alredy init`, 'log');
        } else {
            _debug ? storage.setItem('storage', encode('{}')) : storage.setItem('storage', encode(JSON.parse('{}')));
            _console(`store reinit`, 'log');
        }
    }
}

export const getStore = () => {
    return decode(storage.getItem('storage'));
}

export const getGroup = (nameGroup) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup)) {
        _console('Group name must be filled', 'error');
        return;
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    return obj[nameGroup];
}

export const addGroup = (nameGroup) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup)) {
        _console('Group name must be filled', 'error');
        return;
    }
    if (!isValidObj(nameGroup)) {
        _console('This group alredy add', 'error');
        return;
    }
    obj[nameGroup] = {}
    storage.setItem('storage', encode(obj));
    _console(`Group ${nameGroup} added`, 'log');
}

export const removeGroup = (nameGroup) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup)) {
        _console('Group name must be filled', 'error');
        return;
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    delete obj[nameGroup];
    storage.setItem('storage', encode(obj));
    _console(`Group ${nameGroup} delete`, 'log');
}

export const getItem = (nameGroup, nameItem) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup) && isValidText(nameItem)) {
        _console(`Group name and item name must be filled`, 'error');
        return;
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    if (isValidObj(nameGroup, nameItem)) {
        _console(`Item ${nameItem} not find in this ${nameGroup} group, please add group`, 'error');
        return;
    }
    return obj[nameGroup][nameItem];
}

export const addItem = (nameGroup, nameItem, textItem) => {
    let obj = decode(storage.getItem('storage'))
    
    if (isValidText(nameGroup) && isValidText(nameItem) && isValidText(textItem)) {
        _console(`Group name and item name and item text must be filled`, 'error');
        return;
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    if (isValidObj(nameGroup, nameItem)) {
        _console(`Item ${nameItem} allredy add, please edit this item or delete, if you need`, 'error');
        return;
    }
    obj[nameGroup][nameItem] = textItem;
    storage.setItem('storage', encode(obj));
    _console(`Item ${nameItem} - ${textItem} add to ${nameGroup} group`, 'log');
}

export const editItem = (nameGroup, nameItem, newValue) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup) && isValidText(nameItem) && isValidText(newValue)) {
        _console('Group name and item name and new item value must be filled', 'error');
        return;
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    if (isValidObj(nameGroup, nameItem)) {
        _console(`Item ${nameItem} not found`, 'error');
        return;
    }
    obj[nameGroup][nameItem] = newValue;
    storage.setItem('storage', encode(obj));
    _console(`Item ${nameItem} delete`, 'log');
}

export const removeItem = (nameGroup, nameItem) => {
    let obj = decode(storage.getItem('storage'));
    if (isValidText(nameGroup) && isValidText(nameItem)) {
        _console('Group name and item name must be filled', 'error');
    }
    if (isValidObj(nameGroup)) {
        _console(`Group ${nameGroup} not find, please add group`, 'error');
        return;
    }
    if (isValidObj(nameGroup, nameItem)) {
        _console(`Item ${nameItem} not found`, 'error');
        return;
    }
    delete obj[nameGroup][nameItem];
    storage.setItem('storage', encode(obj));
    _console(`Item ${nameItem} delete`, 'log');
}
