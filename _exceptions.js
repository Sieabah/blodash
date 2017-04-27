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

module.exports.FalseIf = FalseIf;

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

module.exports.TooManyDots = TooManyDots;