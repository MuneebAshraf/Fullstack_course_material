import mongoose, {Document} from 'mongoose';
import Shelter from "./Shelter";

export interface IPet extends Document {
    name: string;
    species: string;
    shelter: string;
    adoptionRequests: string[];
}

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter',
    },
    adoptionRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdoptionRequest'
    }]
});

//remove pet id from shelter after pet is deleted
petSchema.post('findOneAndDelete', async function (doc: IPet) {
    await Shelter.findByIdAndUpdate(doc.shelter, {$pull: {pets: doc._id}});
});

export default mongoose.model<IPet>('Pet', petSchema);
