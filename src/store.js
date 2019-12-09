const storage = localStorage;
let env = false;

function _console(text, param) {
    if (!env) {
        if (param === 'log') {
            console.log(text) 
        } else if (param === 'error') {
            console.error(text)
        } 
    }
}

function checkText(str) {
    if (typeof str === 'undefined') {
        return false
    } else {
        return true;
    }
}

function checkObj(group, name) {
    let obj = JSON.parse(storage.getItem('storage'))
    if (typeof name === 'undefined') {
        if (typeof obj[group] === "undefined") {
            return true
        } else {
            return false;
        }    
    } else {
        console.log(obj[group][name])
        if (typeof obj[group][name] !== "undefined") {
            return true
        } else {
            return false;
        }    
    }
}

export const initStore = (prod) => {
    if (storage.length === 0) {
        storage.setItem('storage', '{}')
        _console(`store init`, 'log')
    } else {
        if (storage.getItem('storage')[0] === '{' && storage.getItem('storage')[parseInt(storage.getItem('storage').length) - 1] === '}') {
            _console(`store alredy init`, 'log')
        } else {
            storage.setItem('storage', '{}')
            _console(`store reinit`, 'log')
        }
    }
    if (prod) {
        env = true;
    }
}

export const getStore = () => {
    return JSON.parse(storage.getItem('storage'))
}

export const getGroup = (nameGroup) => {
    if (checkText(nameGroup)) {
        let obj = JSON.parse(storage.getItem('storage'))
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        return obj[nameGroup];
    } else {
        _console('Group name must be filled', 'error');
    }
}

export const addGroup = (nameGroup) => {
    if (checkText(nameGroup)) {
        let obj = JSON.parse(storage.getItem('storage'))
        if (!checkObj(nameGroup)) {
            _console('This group alredy add', 'error')
            return false;
        }
        obj[nameGroup] = {}
        storage.setItem('storage', JSON.stringify(obj))
        _console(`Group ${nameGroup} added`, 'log')
    } else {
        _console('Group name must be filled', 'error')
    }
}

export const removeGroup = (nameGroup) => {
    if (checkText(nameGroup)) {
        let obj = JSON.parse(storage.getItem('storage'));
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        delete obj[nameGroup];
        storage.setItem('storage', JSON.stringify(obj));
        _console(`Group ${nameGroup} delete`, 'log');
    } else {
        _console('Group name must be filled', 'error');
    }
}

export const getItem = (nameGroup, nameItem) => {
    if (checkText(nameGroup) || checkText(nameItem)) {
        let obj = JSON.parse(storage.getItem('storage'))
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        if (checkObj(nameGroup, nameItem)) {
            _console(`Item ${nameItem} not find in this ${nameGroup} group, please add group`, 'error');
            return false;
        }
        return obj[nameGroup][nameItem];
    } else {
        _console(`Group name and item name must be filled`, 'error');
    }
}

export const addItem = (nameGroup, nameItem, textItem) => {
    if (checkText(nameGroup) || checkText(nameItem) || checkText(textItem)) {
        let obj = JSON.parse(storage.getItem('storage'))
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        if (checkObj(nameGroup, nameItem)) {
            _console(`Item ${nameItem} allredy add, please edit this item or delete, if you need`, 'error');
            return false;
        }
        obj[nameGroup][nameItem] = textItem;
        storage.setItem('storage', JSON.stringify(obj));
        _console(`Item ${nameItem} - ${textItem} add to ${nameGroup} group`, 'log');
    } else {
        _console(`Group name and item name and item text must be filled`, 'error');
    }
}

export const editItem = (nameGroup, nameItem, newValue) => {
    if (checkText(nameGroup) || checkText(nameItem) || checkText(newValue)) {
        let obj = JSON.parse(storage.getItem('storage'));
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        if (checkObj(nameGroup, nameItem)) {
            _console(`Item ${nameItem} not found`, 'error');
            return false;
        }
        obj[nameGroup][nameItem] = newValue;
        storage.setItem('storage', JSON.stringify(obj));
        _console(`Item ${nameItem} delete`, 'log');
    } else {
        _console('Group name and item name and new item value must be filled', 'error')
    }
}

export const removeItem = (nameGroup, nameItem) => {
    if (checkText(nameGroup) || checkText(nameItem)) {
        let obj = JSON.parse(storage.getItem('storage'));
        if (checkObj(nameGroup)) {
            _console(`Group ${nameGroup} not find, please add group`, 'error');
            return false;
        }
        if (checkObj(nameGroup, nameItem)) {
            _console(`Item ${nameItem} not found`, 'error');
            return false;
        }
        delete obj[nameGroup][nameItem];
        storage.setItem('storage', JSON.stringify(obj));
        _console(`Item ${nameItem} delete`, 'log');
    } else {
        _console('Group name and item name must be filled', 'error');
    }
}
