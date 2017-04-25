const b_ = require('./index.js'),
    should = require('should');

describe('Tests', function(){
    it('Should Do If', function(done){
        b_.if(function(){return true}).then(function(){
            done();
        });
    });

    it('Should Do Unless', function(done){
        b_.unless(function(){return false}).then(function(){
            done();
        });
    });

    it('Should be completely synchronous', function(done){
        let sync = false;

        b_.if(function(){return true}).then(function(){
            sync = true;
        });

        if(sync)
            done();
        else
            done(new Error('Asynchronous'));
    });

    it('Should ififfy', function(){
        should(b_.ififfy(true)()).be.true();
        should(b_.ififfy(false)()).be.false();
    });

    it('If Should not explode if Falsey value if given', function(){
        b_.if(b_.ififfy(false));
    });

    it('If Should explode if Falsey value if given and silent is false', function(){
        should.throws(function(){b_.if(b_.ififfy(false), false);});
    });

    it('Should catch if silently', function(done){
        b_.if(function(){
            return b_._else(function(){
                b_.if(function(){return false}).then(function(){
                    done(new Error("This shouldn't be called"));
                });
            }) === undefined;
        }).then(function(){
            done();
        });
    });

    it('Should return value', function(){
        let value = b_.if(function(){return true}).then(function(){
            return 'value';
        });

        should(value).equal('value');
    });

    it('Should blow', function(done){
        b._get(b_.get(b_, 'if', function(){})(function(){return b_.get(b_,'_else',function(){})(function(){
            b_.get(b_.get(b_, 'if', function(){})(b_.get(b_, 'ififfy', function(){})(false), 'then', function(){})(function(){
                done(new Error("This shouldn't be called"));
            }))}) === undefined;
        }), 'then', function(){})(function(){
            done();
        });
    });
});