import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import UPDATE from '../graphql/mutations/Update';
import DELETE from '../graphql/mutations/Delete';
import {useCurrentUser} from '../contexts/UserContext';

const EditProfile: React.FC = () => {
    const currentUser = useCurrentUser();

    const [username, setUsername] = useState<string>(currentUser?.username || '');
    const [email, setEmail] = useState<string>(currentUser?.email || '');
    const [password, setPassword] = useState<string>('');

    const [updateUser] = useMutation(UPDATE.USER);
    const [deleteUser] = useMutation(DELETE.USER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const input = {username, email, password};
            await updateUser({
                variables: {input}
            });
            alert('Profile updated successfully!');
        } catch (err:any) {
            console.error("Error updating profile:", err.message);
        }
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            try {
                await deleteUser({
                    variables: {id: currentUser?.id}
                });
                // Handle user logout or redirection after profile deletion
            } catch (err:any) {
                console.error("Error deleting profile:", err.message);
            }
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password (leave blank to keep current password):</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-update">Update Profile</button>
            </form>
            <button className="btn-delete" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
    );
};

export default EditProfile;
