import {useEffect} from 'react';
import {useCurrentUser} from "../contexts/UserContext";
import {useMutation, useQuery} from "@apollo/client";
import GET_BY_ID from "../graphql/queries/GetById";
import ProfileDetails from "../components/ProfileDetails";
import BrowsePets from "../components/BrowsePets";
import Shelters from "./Shelters";
import {AdoptionRequest} from "../types";
import DELETE from "../graphql/mutations/Delete";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const [deleteAdoptionRequest] = useMutation(DELETE.ADOPTIONREQUEST);
    const data = useQuery(GET_BY_ID.ADOPTION_REQUEST, {
        variables: {id: currentUser?.id},
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }

    }, [currentUser]);


    const handleDeleteAdoptionRequest = async (adoptionRequestId:string) => {
        //call grapql delete mutation DELETE
        try {
            await deleteAdoptionRequest({
                variables: {id: adoptionRequestId},
            });
        } catch (err:any) {
            console.error("Error deleting the adoption request:", err.message);
        }
    }


    return (
        <div className="dashboard-container">
            <h2>Welcome to your Dashboard {currentUser?.username}</h2>

            {/* User Profile Section */}
           <ProfileDetails/>
            {/* My Adoption Requests */}
            <section className="adoption-requests">
                <h3>My Adoption Requests</h3>
                {data && data.adoptionRequests && data.adoptionRequests.map((adoptionRequests: AdoptionRequest) => (
                    <div className={(adoptionRequests.status).toLowerCase()} key={adoptionRequests.id}>
                        <h2>{adoptionRequests.status}</h2>
                        <p>{adoptionRequests.pet.name}</p>
                        <button className={'btn'} onClick={() => handleDeleteAdoptionRequest(adoptionRequests.id)} >Cancel</button>
                    </div>
                ))}
            </section>

            {/* Browse Pets */}
            <BrowsePets/>

            {/* Shelters */}
            <Shelters/>
        </div>
    );
};

export default Dashboard;
