const b_ = require('./index.js'),
    should = require('should');

describe('Tests', function(){
    it('Should ififfy', function(){
        should(b_.get('ififfy').ififfy(b_.get('true').true)()).be.true();
        should(b_.get('ififfy').ififfy(b_.get('false').false)()).be.false();
    });

    it('Should Do If', function(done){
        b_.get('if').if(b_.get('ififfy').ififfy(b_.get('true').true)).then(function(){
            done();
        });
    });

    it('Should Do Unless', function(done){
        b_.get('unless').unless(b_.get('ififfy').ififfy(b_.get('false').false)).then(function(){
            done();
        });
    });

    it('Should be completely synchronous', function(done){
        let sync = b_.get('false').false;

        b_.get('if').if(b_.get('ififfy').ififfy(b_.get('true').true)).then(function(){
            sync = b_.get('true').true;
        });

        if(sync)
            done();
        else
            done(new Error('Asynchronous'));
    });

    it('If Should not explode if Falsey value if given', function(){
        b_.get('if').if(b_.get('ififfy').ififfy(b_.get('false').false));
    });

    it('If Should explode if Falsey value if given and silent is false', function(){
        should.throws(function(){b_.get('if').if(b_.get('ififfy').ififfy(b_.get('false').false), b_.get('false').false)});
    });

    it('Should catch if silently', function(done){
        b_.get('if').if(function(){
            return b_.get('_else')._else(function(){
                b_.get('if').if(b_.get('ififfy').ififfy(b_.get('false').false)).then(function(){
                    done(new Error("This shouldn't be called"));
                });
            }) === b_.get('undefined').undefined;
        }).then(function(){
            done();
        });
    });

    it('Should return value', function(){
        let value = b_.get('if').if(b_.get('ififfy').ififfy(b_.get('true').true)).then(function(){
            return 'value';
        });

        should(value).equal('value');
    });

    it('Should get correctly', function(){
        should(b_.get({one: 1}, 'one').one).be.equal(1);
    });

    it('Should not allow deep gets', function(){
        should.throws(function(){
            b_.get({one: { two: 2 }}, 'one.two')
        });
    });
});