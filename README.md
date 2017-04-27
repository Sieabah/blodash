# bLodash

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