// src/components/PersonDetails.tsx
import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import GET_PERSON from '../graphql/queries/GetPerson';
import Person from '../types/Person';
import Address from '../types/Address';

const PersonDetails = () => {
    const {id} = useParams<{ id: string }>();
    const {loading, error, data} = useQuery(GET_PERSON, {
        variables: {id}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.person) return <p>No person found with the given ID.</p>;

    const person: Person = data.person;
    console.log(person.imageUrl)

    return (
        <>
            <Link className={'back-btn'} to={'/'}>&larr; Back</Link>
            <div className={'container'}>
                <img src={person.imageUrl} alt={person.name}/>
                <h2>{person.name}</h2>
                <p>Alder: {person.age}</p>
                <p>Email: {person.email}</p>
                <p>Tlf: {person.phone}</p>

                <h2>Adresser:</h2>
                <ul>
                    {person.addresses.map((address: Address) => (
                        <li key={address._id}>
                            <p>Gade: {address.street}</p>
                            <p>By: {address.city}</p>
                            <p>Postnummer: {address.zip}</p>
                            <p>Land: {address.country}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default PersonDetails;
