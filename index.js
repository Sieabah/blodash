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
        try {
            _.if(e instanceof E.FalseIf, function(){})
            
            return undefined;
        } catch(_e){
            throw e;
        }
    }
};

_.switch = function(option, cb){
    var cases = [];

    var switchedValue = cb == null ? option : null;

    var _switch = {
        case: addCase,
        eval: function(result, _default){

            if(switchedValue != null)
                result = switchedValue;
            
            var triggered = false;
            
            try {
                for(var i = 0; i < cases.length; i++)
                    if(cases[i][0] === result){
                        for(var j = i; i < cases.length; ++j)
                            if(cases[j][1]() === null){
                                triggered = true;
                                break;
                            } else 
                                i = j;          
                    }
                
                if(!triggered || cases.length === 0)
                    if(_default && typeof _default === 'function')
                        _default();
                    else
                        throw new E.SwitchDefault;
    
            } catch(e) {
                if(e instanceof E.SwitchDefault)
                    throw e;
            }
        }
    };

    function addCase(o, c){
        if(typeof o === 'function'){
            cases.push([undefined, o]);
            return _switch;
        }
        
        cases.push([o, c]);

        return _switch;
    }

    if(switchedValue == null)
        addCase(option, cb);

    return _switch;
};

var _get = _.get;

_.get = function(obj, key, _default){
    if(key.split('.').length > 1)
        throw new E.TooManyDots();

    return _get(obj, key, _default);
};

module.exports = _;
module.exports.E = E;