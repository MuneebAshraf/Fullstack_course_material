import userResolvers from './userResolvers';
import petResolvers from './petResolvers';
import adoptionRequestResolvers from './adoptionRequestResolvers';
import shelterResolvers from './shelterResolvers';

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...petResolvers.Query,
        ...adoptionRequestResolvers.Query,
        ...shelterResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...petResolvers.Mutation,
        ...adoptionRequestResolvers.Mutation,
        ...shelterResolvers.Mutation,
    },
};

export default resolvers;
