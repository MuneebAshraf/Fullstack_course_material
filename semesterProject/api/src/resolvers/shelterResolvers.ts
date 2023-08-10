import Shelter, {IShelter} from '../models/Shelter';
import Pet from "../models/Pet";

const shelterResolvers = {
    Query: {
        shelters: async () => {
            try {
                return await Shelter.find().populate('pets');
            } catch (error: any) {
                console.error(`Failed to fetch shelters: ${error.message}`);
                throw new Error('Failed to fetch shelters');
            }
        },
        shelter: async (_: never, {id}: { id: string }) => {
            try {
                return await Shelter.findById(id).populate('pets');
            } catch (error: any) {
                console.error(`Failed to fetch shelter with id ${id}: ${error.message}`);
                throw new Error('Failed to fetch shelter');
            }
        },
    },
    Mutation: {
        createShelter: async (_: never, {input}: { input:IShelter }) => {
            try {
                return await Shelter.create(input);
            } catch (error: any) {
                console.error(`Failed to create shelter: ${error.message}`);
                throw new Error('Failed to create shelter');
            }
        },
        updateShelter: async (_: never, {id, input}: { id: string, input: IShelter }) => {
            try {
                return await Shelter.findByIdAndUpdate(
                    id,
                    {input},
                    {new: true}
                );
            } catch (error: any) {
                console.error(`Failed to update shelter with id ${id}: ${error.message}`);
                throw new Error('Failed to update shelter');
            }
        },
        //delete shelter
        deleteShelter: async (_: never, {id}: { id: string }) => {
            try {
                const isShelterDeleted = await Shelter.findByIdAndDelete(id);
                //delete all pets in shelter
                const pets = await Pet.find({shelter: id});
                const IsPetsDeleted = await Promise.all(
                    pets.map(async (pet) => {
                        try {
                            const isDeleted = await Pet.findByIdAndDelete(pet._id);
                            return !!isDeleted;
                        } catch (error:any) {
                            console.error(`Failed to delete pet with id ${pet._id}: ${error.message}`);
                            return false;
                        }
                    })
                );
                return !!isShelterDeleted && IsPetsDeleted.every(Boolean);
            } catch (error: any) {
                console.error(`Failed to delete shelter with id ${id}: ${error.message}`);
                throw new Error('Failed to delete shelter');
            }
        }
    },
};

export default shelterResolvers;
