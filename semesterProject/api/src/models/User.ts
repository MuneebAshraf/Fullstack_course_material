import mongoose, {Document} from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    adoptionHistory: string[];
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: Boolean,
    adoptionHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdoptionRequest'
    }],
});

userSchema.pre('save', async function (next) {
    const user = this;

    console.log('userSchema.pre save', user)

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    this.isAdmin = false;

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        user.password =  await bcrypt.hash(user.password, salt); // Hash the password and replace the plain-text password with the hashed one
        next();
    } catch (error:any) {
        next(error);
    }
});

export default mongoose.model<IUser>('User', userSchema );
