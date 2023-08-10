import Pet, {IPet} from '../models/Pet';
import Shelter from "../models/Shelter";

const petResolvers = {
  Query: {
    pets: async () => {
      // Fetch all pets from the database
      try {
        return await Pet.find().populate('shelter adoptionRequests');
      } catch (error: any) {
        console.error(`Failed to fetch pets: ${error.message}`);
        throw new Error('Failed to fetch pets');
      }

    },
    pet: async (_:never, {id}:{id:string}) => {
      // Fetch a specific pet by ID from the database
        try {
          return await Pet.findById(id).populate('shelter adoptionRequests');
        } catch (error: any) {
            console.error(`Failed to fetch pet with id ${id}: ${error.message}`);
            throw new Error('Failed to fetch pet');
        }
    },
  },
  Mutation: {
    createPet: async (_:never, {input}: { input:IPet }) => {
      //Create a new pet in the database
        try {
            const newPet = await Pet.create(input);
            if (newPet.shelter) {
                // Find the shelter and push the new pet's ID to it
                await Shelter.findOneAndUpdate(
                    {id: newPet.shelter},
                    {$push: {pets: newPet.id}}
                );
            }
            return newPet.populate('shelter adoptionRequests');
        } catch (error: any) {
            console.error(`Failed to create pet: ${error.message}`);
            throw new Error('Failed to create pet');
        }
    },
    updatePet: async (_:never, { id, input }:{id:string, input:IPet}) => {
      // Update a pet in the database with the given id and pet
        try {
          return await Pet.findByIdAndUpdate(
            id,
            input,
            {new: true} // This option returns the updated document
            ).populate('shelter');
        } catch (error: any) {
            console.error(`Failed to update pet with id ${id}: ${error.message}`);
            throw new Error('Failed to update pet');
        }
    },
    //delete pet from the database with the given id and remove from shelter
    deletePet: async (_:never, {id}:{id:string}) => {
        try {
            const isDeleted = await Pet.findByIdAndDelete(id);
            return !!isDeleted;
        } catch (error: any) {
            console.error(`Failed to delete pet with id ${id}: ${error.message}`);
            throw new Error('Failed to delete pet');
        }
    }
  },
};

export default petResolvers;
