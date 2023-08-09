import React, { useState } from 'react';
import { Person as PersonType } from '../types/Person';
import {Link, useNavigate} from "react-router-dom";

interface Props {
    people: PersonType[];
    addPerson: (person: PersonType) => void;
}

const AddPersonForm: React.FC<Props> = ({ people, addPerson }) => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
        country: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (firstName && lastName && age) {
            const newPerson: PersonType = {
                //id is last person in people +1
                id: Math.max(...people.map(person => person.id)) + 1,
                firstName,
                lastName,
                age: Number(age),
                address
            };
            addPerson(newPerson);
            setFirstName('');
            setLastName('');
            setAge('');
            setAddress({
                street: '',
                city: '',
                zipCode: '',
                country: ''
            });
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Link to={"/"}>Back</Link>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            <input value={age} onChange={e => setAge(parseInt(e.target.value))} placeholder="Age" type="number" />
            <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} placeholder="Street" />
            <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="City" />
            <input value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} placeholder="Zip Code" />
            <input value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} placeholder="Country" />
            <button type="submit">Add Person</button>
        </form>
    );
};

export default AddPersonForm;
