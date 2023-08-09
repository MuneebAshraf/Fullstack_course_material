import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {setupMongoose} from "./mongoose";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import * as process from "process";

const setupGraphQL = async () => {

    setupMongoose();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    async function startServer() {
        const {url} = await startStandaloneServer(server, {
            listen: {port: Number(process.env.PORT) || 4000}
        });
        console.log(`🚀 Server ready at: ${url}`);
    }
    startServer()

}

export default setupGraphQL;
