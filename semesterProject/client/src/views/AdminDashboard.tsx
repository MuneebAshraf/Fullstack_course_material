import React, {useEffect, useState} from 'react';
import {useCurrentUser} from "../contexts/UserContext";
import {useMutation, useQuery} from "@apollo/client";
import ProfileDetails from "../components/ProfileDetails";
import BrowsePets from "../components/BrowsePets";
import Shelters from "./Shelters";
import {AdoptionRequest, AdoptionStatus} from "../types";
import DELETE from "../graphql/mutations/Delete";
import {useNavigate} from "react-router-dom";
import GET_ALL from "../graphql/queries/GetAll";
import UPDATE from "../graphql/mutations/Update";

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();
    const [deleteAdoptionRequest] = useMutation(DELETE.ADOPTIONREQUEST);
    const [updateAdoptionRequest] = useMutation(UPDATE.ADOPTION_REQUEST);
    const {loading, error, data} = useQuery(GET_ALL.ADOPTION_REQUESTS, {
        fetchPolicy: 'network-only',
    });


    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }

    }, [currentUser, data]);


    const handleDeleteAdoptionRequest = async (adoptionRequestId:string) => {
        //call grapql delete mutation DELETE
        try {
            const response = await deleteAdoptionRequest({
                variables: {id: adoptionRequestId}
            });

            if (response){//remove the div element with the key of the adoption request id

            }
        } catch (err:any) {
            console.error("Error deleting the adoption request:", err.message);
        }
    }


    function handleApproveAdoptionRequest(event: React.ChangeEvent<HTMLSelectElement>, adoptionRequest: AdoptionRequest) {
        //call grapql delete mutation UPDATE
        try {
            event.preventDefault();
            const status = event.target.value;

            const response = updateAdoptionRequest({
                variables: {
                    id: adoptionRequest.id,
                    input: {
                        user: adoptionRequest.user.id,
                        pet: adoptionRequest.pet.id,
                        status: status
                    }
                }
            });

            if (response){
                //rerender the div element with the key of the adoption request id

            }
        } catch (err:any) {
            console.error("Error updating the adoption request:", err.message);
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
                {data && data.adoptionRequests.map((adoptionRequest: AdoptionRequest) => (
                    <div className={(adoptionRequest.status).toLowerCase()} key={adoptionRequest.id}>
                        <h2>{adoptionRequest.status}</h2>
                        <p>{adoptionRequest.pet.name}</p>
                        <button className={'btn'} onClick={() => handleDeleteAdoptionRequest(adoptionRequest.id)} >Cancel</button>
                        <select name="status" id="status" onChange={(event) => handleApproveAdoptionRequest(event, adoptionRequest)}>
                            <option value={AdoptionStatus.PENDING}>Pending</option>
                            <option value={AdoptionStatus.APPROVED}>Approve</option>
                            <option value={AdoptionStatus.REJECTED}>Reject</option>
                        </select>
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
