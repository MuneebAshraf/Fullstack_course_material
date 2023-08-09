import React, {useState} from 'react';
import {Person} from "../types/Person";
import {Link, useNavigate} from 'react-router-dom';

type Props = {
    addPerson: (person: Person) => void;
};

const AddPersonForm: React.FC<Props> = ({addPerson}) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [occupation, setOccupation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && age && occupation) {
            addPerson({id: Date.now(), name, age: Number(age), occupation});
            setName('');
            setAge('');
            setOccupation('');
            navigate('/');
        }
    };

    return (
        <>
            <Link to="/">Go Back</Link>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number"/>
                <input value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Occupation"/>
                <button type="submit">Add Person</button>
            </form>
        </>
    );
};

export default AddPersonForm;
