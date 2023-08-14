import React, {useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { useQuery} from '@apollo/client';
import GET_BY_ID from '../graphql/queries/GetById';
import {Pet, Shelter} from "../types";

const ShelterDetails: React.FC = () => {
    const navigate = useNavigate();
    const id = useParams<{ id: string }>();
    const {data, loading, error} = useQuery(GET_BY_ID.SHELTER, {
        variables: {id}
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Shelter not found</p>;

    const shelter:Shelter = data.shelter;
    return (
        <div className="shelter-details-container">
            <h2>{shelter.name}</h2>
            <p>Address: {shelter.address}</p>
            <p>Email: {shelter.email}</p>

            <h3>Pets available for adoption:</h3>
            <ul>
                {shelter.pets.map((pet: Pet) => (
                    <li key={pet.id}>
                        <Link to={`/pet/${pet.id}`}>{pet.name}</Link> - {pet.species} - {pet.adoptionRequests.length ? 'Not available for adoption' : 'Available for adoption'},
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShelterDetails;
