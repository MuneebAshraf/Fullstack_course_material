import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Person as PersonType} from '../types/Person';

interface Props {
    people: PersonType[];
    updatePerson: (person: PersonType) => void;
}

const UpdatePersonForm: React.FC<Props> = ({people, updatePerson}) => {
    const {id} = useParams<{ id: string }>();
    const [person, setPerson] = useState<PersonType | undefined>(undefined);

    useEffect(() => {
        const foundPerson = people.find(person => person.id === Number(id));
        setPerson(foundPerson);
    }, [id, people]);

    const handleUpdate = (e: React.FormEvent, updatedPerson: PersonType) => {
        e.preventDefault();
        if (updatedPerson) {
            updatePerson(updatedPerson);
        }
    };

    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Link to={"/"} onClick={() => setPerson(undefined)}>Back</Link>
            <h2>Edit person</h2>
            <form onSubmit={(e) => handleUpdate(e, person)}>
                <input type="text" value={person.firstName}
                       onChange={(e) => setPerson({...person, firstName: e.target.value})}/>
                <input type="text" value={person.lastName}
                       onChange={(e) => setPerson({...person, lastName: e.target.value})}/>
                <input type="number" value={person.age}
                       onChange={(e) => setPerson({...person, age: Number(e.target.value)})}/>
                <input type="text" value={person.address.street}
                       onChange={(e) => setPerson({...person, address: {...person.address, street: e.target.value}})}/>
                <input type="text" value={person.address.city}
                       onChange={(e) => setPerson({...person, address: {...person.address, city: e.target.value}})}/>
                <input type="text" value={person.address.zipCode}
                       onChange={(e) => setPerson({...person, address: {...person.address, zipCode: e.target.value}})}/>
                <input type="text" value={person.address.country}
                       onChange={(e) => setPerson({...person, address: {...person.address, country: e.target.value}})}/>

                <button type="submit">Update</button>
            </form>
        </>
    );
};

export default UpdatePersonForm;
