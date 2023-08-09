//import all resolvers
import personResolvers from './personResolvers';
import addressResolvers from './addressResolvers';
import mutationResolvers from './mutationResolvers';
import queryResolvers from "./queryResolvers";


//combine all resolvers
const resolvers = {
    Query: {
        ...queryResolvers
    },
    Mutation: {
        ...personResolvers,
        ...addressResolvers,
        ...mutationResolvers,
    }


};
export default resolvers;
