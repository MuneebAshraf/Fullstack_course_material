import React from 'react';
import {useParams, Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import GET_BY_ID from '../graphql/queries/GetById';
import {Pet} from "../types";

const ShelterDetails: React.FC = () => {
    const {id: shelterId} = useParams<{ id: string }>();
    const {loading, error, data} = useQuery(GET_BY_ID.SHELTER, {
        variables: {shelterId}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const {shelter} = data;

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
