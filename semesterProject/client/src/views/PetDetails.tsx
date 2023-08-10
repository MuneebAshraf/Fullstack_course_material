import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import GET_BY_ID from '../graphql/queries/GetById';
import CREATE from '../graphql/mutations/Create';
import {AdoptionStatus, Pet} from "../types";
import {useCurrentUser} from "../contexts/UserContext";
import {AdoptionRequestInput} from "../types";

const PetDetails: React.FC = () => {
    const currentUser = useCurrentUser();
    const {id} = useParams < {id: string} > ();
    const {data, loading, error} = useQuery( GET_BY_ID.PET, {
        variables: {id}
    } );

    const [createAdoptionRequest] = useMutation( CREATE.ADOPTIONREQUEST );

    const handleAdopt = async () => {
        try {
            const input: AdoptionRequestInput = {pet: id, user: currentUser?.id, status: AdoptionStatus.PENDING};
            await createAdoptionRequest( {
                variables: {input}
            } );
            alert( 'Adoption request sent!' );
        } catch ( err ) {
            console.error( 'Error sending adoption request:', err );
        }
    };

    if ( loading ) return <p>Loading...</p>;
    if ( error ) return <p>Error: {error.message}</p>;

    const pet:Pet = data.pet;

    return (
        <div className="pet-details-container">
            <h2>{pet.name}</h2>
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Shelter:</strong> {pet.shelter.name}</p>
            <button onClick={handleAdopt}>Adopt</button>
        </div>
    );
};

export default PetDetails;
