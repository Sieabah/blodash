const expor = require('lodash');

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
const _get = expor.get;

expor.get = function(obj, key, _default){
    if(key.split('.').length > 1)
        throw new TooManyDots();

    return _get(obj, key, _default);
}

expor.do = function(func){
    return func();
}

expor.ififfy = function(boolean){
    return function(){ 
        return boolean;
    }
}

expor.if = function(boolean, silent){
    if(silent == undefined)
        silent = true;

    if(boolean())
        return { then: expor.do };
    
    if(silent)
        return { then: function(){} };

    throw new FalseIf();
}

expor._else = function(boolean){
    try {
        return boolean();
    } catch(e){
        return expor.if(expor.ififfy(e instanceof FalseIf)).then(function(){ return undefined; });
        
        throw e;
    }
}

expor.unless = function(boolean){ 
    return expor.if(function(){
        return boolean() === false;
    });
}

module.exports = expor;
