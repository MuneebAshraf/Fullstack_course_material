import User, {IUser} from "../models/User";
import bcrypt from "bcrypt";

const userResolvers = {
    Query: {
        users: async () => {
            // Fetch all users from the database
            try {
                return await User.find().populate('adoptionHistory');
            } catch (error: any) {
                console.error(`Failed to fetch people: ${error.message}`);
                throw new Error('Failed to fetch people');
            }

        },
        user: async (_:never, {id}: {id:string}) => {
            // Fetch a specific user by ID from the database
            try {
                return await User.findById(id).populate('adoptionHistory');
            } catch (error: any) {
                console.error(`Failed to fetch person with id ${id}: ${error.message}`);
                throw new Error('Failed to fetch person');
            }
        },
    },
    Mutation: {
        login: async (_: any, {input}: {input:IUser} )=> {
            console.log(input)
            const user = await User.findOne({username: input.username});
            if (!user) {
                throw new Error('No user found with this email address.');
            }

            const valid = await bcrypt.compare(input.password, user.password);
            if (!valid) {
                throw new Error('Incorrect password.');
            }

            return user;
        },
        createUser: async (_:never, {input}: { input:IUser}) => {
            //create User in the database
            try {
                const user:IUser = input;
                return await User.create(user);
            } catch (error: any) {
                console.error(`Failed to create person: ${error.message}`);
                throw new Error('Failed to create person');
            }
        },
        updateUser: async (_:never, {id, input}:{id:string, input:IUser}) => {
            //update User in the database with the given id and user
            try {
                return await User.findByIdAndUpdate(
                    id,
                    input,
                    {new: true} // This option returns the updated document
                );
            } catch (error: any) {
                console.error(`Failed to update person with id ${id}: ${error.message}`);
                throw new Error('Failed to update person');
            }
        },
        deleteUser: async (_:never, {id}:{id:string}) => {
            try {
                const isDeleted = await User.findByIdAndDelete(id);
                return !!isDeleted;
            } catch (error: any) {
                console.error(`Failed to delete person with id ${id}: ${error.message}`);
                throw new Error('Failed to delete person');
            }
        }
    },
};

export default userResolvers;
