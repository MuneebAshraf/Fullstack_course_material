import React from "react";
import {useCurrentUser} from "../contexts/UserContext";
import {useNavigate} from "react-router-dom";



const ProfileDetails: React.FC = () => {
    const currentUser = useCurrentUser();
    const navigate = useNavigate();

return (
    <div className="container">
    <section className="profile-section">
        <h3>Your Profile</h3>
        <div className="profile-details">
            <label>Username: </label>
            <span>{currentUser?.username}</span>
            <label>Email:</label>
            <span>{currentUser?.email}</span>
        </div>
        <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
    </section>
</div>
)
}

export default ProfileDetails;
