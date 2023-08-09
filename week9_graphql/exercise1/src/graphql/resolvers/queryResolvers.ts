import Person from "../../models/Person";
import Address from "../../models/Address";

type UserArgs = {
    id: string
}

export default {
    // Fetch address with people by addresss id
    peopleOnAddress: async (_: unknown, {_id}: { _id: string }) => {
        try {
            return await Address.findById(_id).populate('people');
        } catch (error: any) {
            console.error(`Failed to fetch address with id ${_id}: ${error.message}`);
            throw new Error('Failed to fetch address');
        }
    }
   ,
    //get all addresses
    addresses: async () => {
        try {
            // Fetch all addresses and populate the 'people' field with actual person documents
            let addresses = await Address.find().populate('people');
            return addresses;
        } catch (error: any) {
            console.error(`Failed to fetch addresses: ${error.message}`);
            throw new Error('Failed to fetch addresses');
        }
    },
    // Fetch a single person by ID
    person: async (_: unknown, {_id} : {_id: string}) => {
        try {
            return await Person.findById(_id).populate('addresses');
        } catch (error: any) {
            console.error(`Failed to fetch person with id ${_id}: ${error.message}`);
            throw new Error('Failed to fetch person');
        }
    },

    // Fetch all persons
    people: async () => {
        try {
            return await Person.find().populate('addresses');
        } catch (error: any) {
            console.error(`Failed to fetch people: ${error.message}`);
            throw new Error('Failed to fetch people');
        }
    },
}
