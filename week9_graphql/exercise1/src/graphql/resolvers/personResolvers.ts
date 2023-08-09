import Person from "../../models/Person";

export default {
    // Create a new person
    createPerson: async (_: unknown,
        {name, age, email, phone, imageUrl, addressId} :
        {name: string, age:number, email: string, phone: string, imageUrl:string, addressId:string } ) => {
        try {
            const person = new Person({name, age, email, phone, imageUrl, addresses: addressId});
            return await person.save();
        } catch (error: any) {
            console.error(`Failed to create person: ${error.message}`);
            throw new Error('Failed to create person');
        }
    },

    // Update an existing person by ID
    updatePerson: async (_: unknown,
        {id, name, age, email, address: {street, city, zip, country}, phone}:
        {id:string, name: string, age: number, email: string, address: { street: string, city: string, zip: string, country: string }, phone: string }) => {
        try {
            return await Person.findByIdAndUpdate(
                id,
                {name, age, email, address: {street, city, zip, country}, phone},
                {new: true} // This option returns the updated document
            );
        } catch (error: any) {
            console.error(`Failed to update person with id ${id}: ${error.message}`);
            throw new Error('Failed to update person');
        }
    },

    // Delete a person by ID
    deletePerson: async (_: unknown, {id}: {id: string}) => {
        try {
            return await Person.findByIdAndDelete(id);
        } catch (error: any) {
            console.error(`Failed to delete person with id ${id}: ${error.message}`);
            throw new Error('Failed to delete person');
        }
    },
}
