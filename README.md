# bLodash

[![Build Status](https://travis-ci.org/Sieabah/blodash.svg?branch=master)](https://travis-ci.org/Sieabah/blodash)
[![We don't lie about our coverage](https://coveralls.io/repos/github/Sieabah/blodash/badge.svg?branch=master)](https://coveralls.io/github/Sieabah/blodash?branch=master)

Why does this library exist? It's *the* satirical edition of the absolutely legendary 
library that is _[lodash](https://github.com/lodash/lodash)_.

Using blodash allows you to liberate your code from nasty issues with using any sort of
native features and tries to take all of the guesswork out of whether something truly
exists or not. To put it simply, it's the last and only library you will ever need from
hereon out.

Don't be fooled about using built in features of Javascript. [You might not know when those
features are going to be ripped out from under you and change.](http://azimi.me/2016/02/11/understanding-strict-mode.html)
So you need a reliable callback based solution.

## bLodash extensions

#### Native#If

Evaluates your function or boolean and will decide to call your callback if it evaluates to true.
If boolean evaluates as false an exception (b_.E.FalseIf) is thrown.

```
b_.if( function|boolean, callback );
```

#### Native#Else

Evaluates your if expression and catches the false exception and returns undefined.

```
b_.else( function|boolean, callback );
```

#### Native#Switch

Evaluates your switch and catches any exception that may be thrown in your case statements. Throws an 
exception only if no statement is found with your value(default case).

```
//Where switched value is known at creation
b_.switch( function|value );

//When switch statement isn't known until later
b_.switch( function|value, callback );

b_.switch( ... )
    .eval( value, defaultCase );
```

## bLodash Example

Simple if

```
var a = true;
var value = b_.if( a, function(){
    return 'if-true';
});

console.log(value);
// if-true
```

Exception Safe If:

Note, there is no way to return a value from an else. You must have a functional callback to be able
to get values out of an else.

```

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
```

Functional Switch:

Never have to worry about native switch again
```
    b_.switch('case1')
        .case('case0', function(){
            iLoveBlodash();
            return null; //Equivalent to break
        })
        .case('case1', function(){
            lodashIsRevolutionary();
            return null;
        });

```

```
var _switch = b_.switch();

for(var i = 0; i < 50; i++)
    _switch.case(i, function(){ console.log(i); });

_switch.eval(5);
// 5 6 7 8 9 10 11 ...
```

Try/Catch:

Never guess about what error is thrown again
```
    b_.try(function(){
        this.object.does.not.work
    })
        .catch(ReferenceError, function(){
            return true;
        })
        .catch(Error, function(){
            return null
        });

    try {
        this.object.does.not.work
    } catch(e) {
        if(e instanceof ReferenceError){
            return true;
        } else {
            return null;
        }
    }
```