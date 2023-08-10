import mongoose from 'mongoose';
import User from "./User";
import Pet from "./Pet";

export interface IAdoptionRequest extends mongoose.Document {
    user: string;
    pet: string;
    status: string;
    dateSubmitted: Date;
}

enum AdoptionRequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED'

}

const adoptionRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    status: {
        type: String,
        enum: AdoptionRequestStatus,
        default: 'Pending'
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});


//add adoption id to pet and user after adoption request is created
adoptionRequestSchema.post('findOneAndUpdate', async function (doc: IAdoptionRequest) {

    console.log(doc)
    //set pets shelter to be null if status of adoption request is approved
    if (doc.status === AdoptionRequestStatus.APPROVED) {
        await Pet.findByIdAndUpdate(doc.pet, {shelter: null});
    }

    //Push adoption request id to user and pet if it dosnt exist
    await User.findByIdAndUpdate(doc.user, {$addToSet: {adoptionRequests: doc._id}});
    await Pet.findByIdAndUpdate(doc.pet, {$addToSet: {adoptionRequests: doc._id}});
});

//remove adoption id from pet and user after adoption request is deleted
adoptionRequestSchema.post('findOneAndDelete', async function (doc: IAdoptionRequest) {
    User.findByIdAndUpdate(doc.user, {$pull: {adoptionRequests: doc._id}});
    Pet.findByIdAndUpdate(doc.pet, {$pull: {adoptionRequests: doc._id}});
});


export default mongoose.model<IAdoptionRequest>('AdoptionRequest', adoptionRequestSchema);
