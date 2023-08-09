import Address, {IAddress} from "../../models/Address";

export default {
    // Create a new address
    createAddress: async (_: unknown,
          {street, city, zip, country}: IAddress ) : Promise<IAddress | unknown> => {
        try {
            const address = new Address({street, city, zip, country});
            return await address.save();
        } catch (error: any) {
            console.error(`Failed to create address: ${error.message}`);
            throw new Error('Failed to create address');
        }
    },
}
