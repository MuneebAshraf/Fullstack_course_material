import Address, {IAddress} from "../../models/Address";
import Person from "../../models/Person";
import mongoose from 'mongoose';

export default {

    //findAddressByStreet(street: String!): [Address]
    findAddressByStreet: async (_: never, {street}: { street: string }) => {
        try {
            return Address.find({street: {$regex: street, $options: 'i'}});
        } catch (error: any) {
            console.error(`Failed to find addresses with street ${street}: ${error.message}`);
            throw new Error('Failed to find addresses');
        }
    },
    //add person to address
    addPersonToAddress: async (_: unknown, {personId, addressId}: { personId: string, addressId: string }) :Promise<IAddress | null>  => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await Person.findByIdAndUpdate(
                personId,
                {$push: {addresses: addressId}}
            );
            await Address.findByIdAndUpdate(
                addressId,
                {$push: {people: personId}},
                {new: true} // This option returns the updated document
            );
            await session.commitTransaction();
            session.endSession();
            return Address.findById(addressId).populate('people');
        } catch (error: any) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Failed to add person with id ${personId} to address with id ${addressId}: ${error.message}`);
            throw new Error('Failed to add person to address');
        }
    },
    //add address to person
    addAddressToPerson: async (_: unknown, {personId, addressId}: { personId: string, addressId: string }) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await Address.findByIdAndUpdate(
                addressId,
                {$push: {people: personId}}
            );
            await Person.findByIdAndUpdate(
                personId,
                {$push: {addresses: addressId}},
                {new: true} // This option returns the updated document
            );
            await session.commitTransaction();
            session.endSession();
            return Person.findById(personId).populate('addresses');
        } catch (error: any) {
            await session.abortTransaction();
            session.endSession();
            console.error(`Failed to add address with id ${addressId} to person with id ${personId}: ${error.message}`);
            throw new Error('Failed to add address to person');
        }
    },
}
