import mongoose, {Document, Schema} from 'mongoose';
import {IAddress} from './Address';

export interface IPerson extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    age: number;
    email: string;
    phone: string;
    addressId: IAddress[];
}

const PersonSchema: Schema = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String},
    phone: {type: String},
    addresses: [{type: Schema.Types.ObjectId, ref: 'Address'}]
});

export default mongoose.model<IPerson>('Person', PersonSchema);
