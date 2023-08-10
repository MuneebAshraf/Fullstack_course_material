import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4";
import {setupMongoose} from "./mongoose";
import typeDefs from './graphql_schemas';
import resolvers from "./resolvers";
import {Express} from "express";

const setupGraphQL = async (app:Express) => {

    setupMongoose();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start(); // Start the Apollo Server

    app.get('/hello', (req, res) => {
        //send a response to the client as json
        res.json({message: 'This is how to listen for requests outside of GraphQL'});
    });

    app.use('/graphql', expressMiddleware(server)); // Use expressMiddleware to integrate Apollo with Express

    // No need to start the standalone server since we'll be using Express
}

export default setupGraphQL;
