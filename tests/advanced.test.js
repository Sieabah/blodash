var b_ = require('../index.js'),
    should = require('should'),
    E = require('../_exceptions');

function noop(){}

describe('Try-catch Suite', function(){
    it('Should catch no errors by default', function(){
        should.throws(function(){
            b_.try(function(){
                throw new Error('throw');
            })
                .exec();
        });
    });

    it('Should call catch function', function(done){
        b_.try(function(){
            throw new Error('throw');
        })
            .catch(Error, function(){ done(); })
            .exec();
    });

    it('Should call first match in chain', function(){
        count = 0;
        b_.try(function(){
            throw new Error('throw');
        })
            .catch(Error, function(){ ++count; })
            .catch(Error, function(){ ++count; })
            .exec();

        should(count).equal(1);
    });

    it('Should return value of try function if no error thrown', function(){
        should(b_.try(function(){
            return true;
        })
            .exec()).equal(true);
    });

    it('Should return value of catch if error was thrown', function(){
        should(b_.try(function(){
            throw new Error();
        })
            .catch(Error, function(){ return 'caught'; })
            .exec()).equal('caught');
    });

    it('Should find first-match', function(){
        var errorType = b_.try(function(){
            oh.god.this.object.is.bad;
        })
            .catch(EvalError, function(){
                return EvalError;
            })
            .catch(ReferenceError, function(){
                return ReferenceError;
            })
            .exec()

        should(errorType).equal(ReferenceError);
    })
});