const express = require( 'express' );
const morgan = require( 'morgan' );
const log4js = require( 'log4js' );
const fs = require( 'fs' );
const path = require( 'path' );

// Load environment variables
require( 'dotenv' ).config();

const app = express();
const PORT = process.env.PORT || 3000;
const logger = log4js.getLogger();

// Middleware
app.use( express.json() );
app.use( morgan( 'dev' ) );
app.use( (req, res, next) => {
    logger.info( `Request received: ${req.method} ${req.originalUrl}` );
    next();
} );

// Custom middleware to add timestamp to request object
app.use( (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
} );

const people = (JSON.parse( fs.readFileSync( path.join( __dirname, 'people.json' ), 'utf-8' ) )).people;
app.get( '/people', (req, res) => {
    res.status( 200 ).json( people );
} );

app.get( '/people/:id',(req, res) => {
    const person = people.find( p => p.id === Number( req.params.id ) );
    res.status( 200 ).json( person );
} );

app.post( '/people', (req, res) => {
    const newPerson = req.body;
    people.push( newPerson );
    fs.writeFileSync( path.join( __dirname, 'people.json' ), JSON.stringify( people ) );
    res.status( 201 ).json( newPerson );
} );

// PUT route to update a person (entire object)
app.put( '/people/:id', (req, res) => {
    const personIndex = people.findIndex( p => p.id === parseInt( req.params.id ) );
    if ( personIndex === -1 ) {
        return res.status( 404 ).json( {message: 'Person not found'} );
    }
    people[ personIndex ] = {...people[ personIndex ], ...req.body};
    fs.writeFileSync( path.join( __dirname, 'people.json' ), JSON.stringify( people ) );
    res.status( 200 ).json( people[ personIndex ] );
} );

// PATCH route to update a person (partial object)
app.patch( '/people/:id', (req, res) => {
    const personIndex = people.findIndex( p => p.id === Number( req.params.id ) );
    if ( personIndex === -1 ) {
        return res.status( 404 ).json( {message: 'Person not found'} );
    }
    people[ personIndex ] = {...people[ personIndex ], ...req.body};
    fs.writeFileSync( path.join( __dirname, 'people.json' ), JSON.stringify( people ) );
    res.status( 200 ).json( people[ personIndex ] );
} );

// DELETE route to delete a person
app.delete( '/people/:id', (req, res) => {
    const personIndex = people.findIndex( p => p.id === Number( req.params.id ) );
    if ( personIndex === -1 ) {
        return res.status( 404 ).json( {message: 'Person not found'} );
    }
    const deletedPerson = people.splice( personIndex, 1 );
    fs.writeFileSync( path.join( __dirname, 'people.json' ), JSON.stringify( people ) );
    res.status( 200 ).json( deletedPerson );
} );


app.listen( PORT, () => {
    console.log( `Server is running on port ${PORT}` );
} );

log4js.configure( {
    appenders: {fileAppender: {type: 'file', filename: './logs/server.log'}},
    categories: {default: {appenders: ['fileAppender'], level: 'info'}}
} );

