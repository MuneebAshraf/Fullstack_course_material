//
const calculatePromise = (x, y, cb) => {
    return new Promise( (resolve, reject) => {
        try {
    console.log( `calling ${cb.name} with ${x} and ${y}` );
            resolve(cb(x, y));
        } catch ( err ) {
            reject(err)
        }
    })
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

//test calculate promise
calculatePromise(1, 2, add)
    .then(res => calculatePromise(res, 3, multiply) )
    .then(res => calculatePromise(res, 4, divide))
    .then(res => calculatePromise(res, 5, subtract))
    .then(res => console.log(res))

// d) they can be chained because they return a promise with the resolved value of the previous promise

//calculate with await/async
const calculateAwait = async (x, y, cb) => {
    try {
        console.log(`calling ${cb.name} with ${x} and ${y}`);
        return await cb(x, y);
    } catch ( err ) {
        throw new Error(err);
    }
}
//test calculate promise
calculateAwait(5, 4, (add))
    .then(res => calculateAwait(res, 3, multiply) )
    .then(res => calculateAwait(res, 2, divide))
    .then(res => calculateAwait(res, 1, subtract))
    .then(res => console.log(res))

