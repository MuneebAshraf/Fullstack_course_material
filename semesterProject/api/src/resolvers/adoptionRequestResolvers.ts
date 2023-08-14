import AdoptionRequest, {IAdoptionRequest} from '../models/AdoptionRequest';
import User from "../models/User";

const adoptionRequestResolvers = {
    Query: {
        adoptionRequests: async () => {
            try {
                return await AdoptionRequest.find().populate('user pet');
            } catch (error: any) {
                console.error(`Failed to fetch adoption requests: ${error.message}`);
                throw new Error('Failed to fetch adoption requests');
            }
        },
        adoptionRequest: async (_: never, {id}: { id: string }) => {
            try {
                //return all adoption requests with the given user id
                return await AdoptionRequest.find({user: id}).populate('pet');
            } catch (error: any) {
                console.error(`Failed to fetch adoption request with id ${id}: ${error.message}`);
                throw new Error('Failed to fetch adoption request');
            }
        },
    },
    Mutation: {
        createAdoptionRequest: async (_: never, {input}: { input: IAdoptionRequest }) => {
            try {
                console.log(input)
                const adoptionRequest = await AdoptionRequest.create(input);
                return adoptionRequest.populate('user pet');
            } catch (error: any) {
                console.error(`Failed to create adoption request: ${error.message}`);
                throw new Error('Failed to create adoption request');
            }
        },
        updateAdoptionRequest: async (_: never, {
            id,
            input
        }: { id: string, input: IAdoptionRequest }) => {
            try {
                return await AdoptionRequest.findByIdAndUpdate(
                    id,
                    input,
                    {new: true}
                ).populate('user pet');
            } catch (error: any) {
                console.error(`Failed to update adoption request with id ${id}: ${error.message}`);
                throw new Error('Failed to update adoption request');
            }
        },
        //delete adoption request
        deleteAdoptionRequest: async (_: never, {id}: { id: string }) => {
            try {
                const isDeleted = await AdoptionRequest.findByIdAndDelete(id);
                return !!isDeleted;
            } catch (error: any) {
                console.error(`Failed to delete adoption request with id ${id}: ${error.message}`);
                throw new Error('Failed to delete adoption request');
            }
        }
    },
};

export default adoptionRequestResolvers;
