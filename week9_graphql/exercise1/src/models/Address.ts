import mongoose, {Document, Schema} from 'mongoose';
import {IPerson} from './Person';

export interface IAddress extends Document {
    _id?: Schema.Types.ObjectId;
    street: string;
    city: string;
    zip: string;
    country: string;
    people: IPerson[];
}

const AddressSchema: Schema = new Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true},
    people: [{type: Schema.Types.ObjectId, ref: 'Person'}]
});

export default mongoose.model<IAddress>('Address', AddressSchema);
