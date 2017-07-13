function FalseIf(message, fileName, lineNumber){
    const instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
FalseIf.prototype = Object.create(Error.prototype, {constructor: {value: Error,enumerable: false,writable: true,configurable: true}});
Object.setPrototypeOf(FalseIf, Error);

module.exports.FalseIf = FalseIf;

function TooManyDots(message, fileName, lineNumber){
    const instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
TooManyDots.prototype = Object.create(Error.prototype, {constructor: {value: Error,enumerable: false,writable: true,configurable: true}});
Object.setPrototypeOf(TooManyDots, Error);

module.exports.TooManyDots = TooManyDots;

function SwitchDefault(message, fileName, lineNumber){
    const instance = new Error(message, fileName, lineNumber);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
SwitchDefault.prototype = Object.create(Error.prototype, {constructor: {value: Error,enumerable: false,writable: true,configurable: true}});
Object.setPrototypeOf(SwitchDefault, Error);

module.exports.SwitchDefault = SwitchDefault;