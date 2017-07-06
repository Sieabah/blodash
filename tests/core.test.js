var b_ = require('../index.js'),
    should = require('should'),
    E = require('../_exceptions');

function noop(){}

describe('Tests', function(){

    it('Should Do If', function(done){
        b_.if(b_.true, function(){
            done();
        });
    });

    it('Should be completely asynchronous', function(done){
        var sync = b_.false;

        b_.if(b_.true, function(){
            sync = b_.true;
        });

        if(sync)
            done();
        else
            done(new Error('Asynchronous'));
    });

    it('If Should not explode if Falsey value if given', function(){
        b_.if(b_.false, b_.false);
        b_.if(b_.false, b_.true);
    });

    it('If Should explode if Falsey value if given and silent is false', function(){
        should.throws(function(){b_.if(b_.false)});
    });

    it('Should catch if silently', function(done){
        b_.if(function(){
            return b_.else(function(){
                b_.if(b_.false, function(){
                    done(new Error("This shouldn't be called"));
                })
            }) === b_.undefined;
        }, function(){ done(); });
    });

    it('Should throw falseIf exception if natural error occured', function(){
        should.throws(function(){
            b_.else(function(){
                throw new Error('Fail');
            });
        }, E.FalseIf);
    });

    it('Should else work with no return data', function(){
        should(b_.else(function(){})).is.false();
        should(b_.else(function(){return true})).is.true();
    });

    it('Should return value', function(){
        var value = b_.if(b_.true, function(){
            return 'value';
        });

        should(value).equal('value');
    });

    it('Should get correctly', function(){
        should(b_.get({one: 1}, 'one')).be.equal(1);
    });

    it('Should not allow deep gets', function(){
        should.throws(function(){
            b_.get({one: { two: 2 }}, 'one.two')
        });
    });

    function safeif(value, cb){
        b_.else(function() {
            b_.if(function() {
                return b_.else(function() {
                        b_.if(value, function() {
                            cb(b_.null);
                        });
                    }) === undefined;
            });

            cb(b_.true);
        });
    }

    it('Positive if should return null', function(done){
        safeif(true, function(value){
            return value === b_.null ? done() : done(new Error('Positive i value: '+value))
        });
    });

    it('Negative if should return true', function(done){
        safeif(false, function(value){
            return value === b_.true ? done() : done(new Error('Incorrect value: '+value))
        });
    });

    it('Should switch normally', function(done){
        b_.switch('test', done)
            .eval('test');
    });

    it('Should switch normally with inverse', function(done){
        b_.switch('test')
            .case('test', done)
            .eval();
    });

    it('Should catch any errors in switch', function(){
        b_.switch('test')
            .case('test', function(){
                throw new Error('I fucked up');
            })
            .eval();
    });

    it('Should throw exception if default case', function(){
        should.throws(function(){
            b_.switch('default')
                .case('test', function(){})
                .eval();
        });
    });

    it('Should fallthrough cases', function(done){
        b_.switch('test')
            .case('test', noop)
            .case('fall', done)
            .eval();
    });

    it('Should call each case that matches', function(){
        var count = 0;
        b_.switch('test')
            .case('test', function(){
                ++count;
                return null;
            })
            .case('test', function(){
                ++count;
                return null;
            })
            .eval();

        should(count).equal(2);
    });

    it('Should handle default case', function(done){
        b_.switch('test')
            .eval(undefined, done);
    });

    it('Should handle falling through and hitting all cases', function(){
        var count = 0;
        b_.switch(0)
            .case(0, function(){++count;})
            .case(1, function(){++count; return null})
            .case(0, function(){++count;})
            .eval();

        should(count).equal(3);
    });

    it('Should handle function fallthroughs', function(done){
        b_.switch(0)
            .case(0, noop)
            .case(done)
            .eval();
    });

    b_.switch(0)
        .case
});