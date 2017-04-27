var b_ = require('./index.js'),
    should = require('should');

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
});