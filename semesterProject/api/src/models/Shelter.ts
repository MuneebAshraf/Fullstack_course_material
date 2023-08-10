import mongoose, {Document} from 'mongoose';

export interface IShelter extends Document {
    name: string;
    address: string;
    email: string;
    pets: string[];
}

const shelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    email: String,
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
});

export default mongoose.model<IShelter>('Shelter', shelterSchema);
