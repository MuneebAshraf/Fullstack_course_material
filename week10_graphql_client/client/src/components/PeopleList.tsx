// src/components/PeopleList.tsx
import {useQuery} from '@apollo/client';
import {Link} from 'react-router-dom';
import GET_PEOPLE from "../graphql/queries/GetAllPeople";
import Person from "../types/Person";
import Address from "../types/Address";

const PeopleList = () => {
    const {loading, error, data} = useQuery(GET_PEOPLE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={'body'}>
            <h1>People List</h1>
                <div className={'controls'}>
                    <Link className={'btn'} to={'/create-person'}>Create Person</Link>
                </div>
            <ul>
                {data.people.map((person:Person) => (
                    <li key={person._id}>
                        <p>Navn: {person.name}</p>
                        <p>Alder: {person.age}</p>
                        <p>Email: {person.email}</p>
                        <p>Tlf: {person.phone}</p>


                        <ul>{person.addresses.map((address:Address) => (
                            <li key={address._id}>
                            <p>Addresse:</p>
                            <p>Gade: {address.street}</p>
                            <p>By: {address.city}</p>
                            <p>Postnummer:{address.zip}</p>
                            <p>Land: {address.country}</p>
                            </li>
                        ))}
                        </ul>
                        <Link className={'btn'} to={`/person/${person._id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PeopleList;
