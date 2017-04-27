var _ = require('lodash');
var E = require('./_exceptions');

_.true = true;
_.false = !_.true;
_.undefined = undefined;
_.null = null;

_.if = function(boolean, cb){
    cb = cb == null ? function(){} : cb;

    if(typeof cb === 'function')
        return (typeof boolean === 'function' ? boolean() : boolean) ? cb() : (function(){throw new E.FalseIf})();
};

_.else = function(exec, cb){
    try {
        var data = exec();
        return data === undefined ? false : data;
    } catch(e){
        if(_.if(
            e instanceof E.FalseIf,
            function(){
                return _.true;
            }
        ))
            return undefined;

        throw e;
    }
};

var _get = _.get;

_.get = function(obj, key, _default){
    if(key.split('.').length > 1)
        throw new E.TooManyDots();

    return _get(obj, key, _default);
};

module.exports = _;
module.exports.E = E;