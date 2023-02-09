const superagent = require('superagent');
const fs = require('fs');
const file = `${__dirname}/dog.txt`

// fs.readFile(file, "utf-8", (err, data) => {
//   console.log(`Breed: ${data}`);
//
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//
//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         console.log('Dog image saved to file successfully');
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// })

//Promises
const readFilePro  = file => {
    //executor function
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf-8", (err, data) => {
        if ( err ) reject('I could not find that file 😢')
          resolve(data);
      })
    })
}
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, data, err => {
        if ( err ) reject('Could not write the file 😢')
          resolve('success');
      })
    })
}

// readFilePro(file).then( data => superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then( res => writeFilePro(file, res.body.message))
//         .then(res => console.log(res) )
//         .catch( err => console.log(err.message) )
//         .finally(() => console.log('1) Finished getting the dog image') )
// );

// Async/Await
// const getDogPic = async () => {
//     try {
//         const data = await readFilePro( file );
//         const res = await superagent.get( `https://dog.ceo/api/breed/${data.trim()}/images/random` );
//         const text = await writeFilePro( `${__dirname}/dog-img.txt`, res.body.message );
//         console.log( text );
//         return text;
//     } catch ( err ) {
//         throw new Error( err.message)
//     }
// };
// getDogPic().then(res => console.log( res ));
//
// //IIFE
// ( async () => {
//     const data = await getDogPic()
//     console.log( data );
// })();

//multiple promises
const getDogPic = async () => {
    try {
        const data = await readFilePro( file );
        const res = await superagent.get( `https://dog.ceo/api/breed/${data.trim()}/images/random` );
        const res2 = await superagent.get( `https://dog.ceo/api/breed/${data.trim()}/images/random` );
        const res3 = await superagent.get( `https://dog.ceo/api/breed/${data.trim()}/images/random` );
        const all = await Promise.all( [res, res2, res3] );
        const imgs = all.map( el => el.body.message );
        const text = await writeFilePro( `${__dirname}/dog-img.txt`, imgs.join('\n'));
        console.log( text );
        return text;
    } catch ( err ) {
        throw new Error( err.message )
    }
};
getDogPic()
