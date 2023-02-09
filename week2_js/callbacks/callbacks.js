const calculate = (x, y, cb) => {
    return cb(x, y);
}

const add = (x, y) => {
    return x + y;
}

const subtract = (x, y) => {
    return x - y;
}

const multiply = (x, y) => {
    return x * y;
}

const divide = (x, y) => {
    return x / y;
}

console.log(calculate(2, 3, add));
console.log(divide(2, 3, add));
console.log(subtract(2, 3, add));
console.log(multiply(2, 3, add));




