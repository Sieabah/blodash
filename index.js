const _ = require('lodash');

function FalseIf(message, fileName, lineNumber){
    const instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
FalseIf.prototype = Object.create(Error.prototype, {constructor: {value: Error,enumerable: false,writable: true,configurable: true}});
if (Object.setPrototypeOf){
    Object.setPrototypeOf(FalseIf, Error);
} else {
    FalseIf.__proto__ = Error;
}

function TooManyDots(message, fileName, lineNumber){
    const instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
TooManyDots.prototype = Object.create(Error.prototype, {constructor: {value: Error,enumerable: false,writable: true,configurable: true}});
if (Object.setPrototypeOf){
    Object.setPrototypeOf(TooManyDots, Error);
} else {
    TooManyDots.__proto__ = Error;
}

_.do = function(func){
    return func();
}

_.ififfy = function(boolean){
    return function(){ 
        return boolean;
    }
}

_.if = function(boolean, silent){
    if(silent == undefined)
        silent = true;

    if(boolean())
        return { then: _.do };
    
    if(silent)
        return { then: function(){} };

    throw new FalseIf();
}

_._else = function(boolean){
    try {
        return boolean();
    } catch(e){
        return _.if(_.ififfy(e instanceof FalseIf)).then(function(){ return undefined; });
        
        throw e;
    }
}

_.unless = function(boolean){ 
    return _.if(function(){
        return boolean() === false;
    });
}

_.true = true;
_.false = !_.true;
_.undefined = undefined;
_.null = null;

function _get(obj, key, _default){
    if(typeof obj == 'string')
        return _get(_, obj, key);

    if(key.split('.').length > 1)
        throw new TooManyDots();

    let ret = {};
    ret[key] = _.get(obj, key, _default);
    return ret;
}

module.exports = {
    get: _get
}