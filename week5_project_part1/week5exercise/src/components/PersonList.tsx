import React from 'react';
import {Person as PersonType} from '../types/Person';
import Person from './Person';
import {Link} from 'react-router-dom';

interface Props {
    people: PersonType[];
    deletePerson: (id: number) => void;
}

const PersonList: React.FC<Props> = ({people, deletePerson}) => {
    return (
        <ul>
            {people.map((person) => (
                <li key={person.id}>
                    <Person {...person}/>
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                    <Link to={`/edit/${person.id}`}>Edit</Link>
                </li>
            ))}
            <Link to="/add">Add New Person</Link>
        </ul>
    );
};

export default PersonList;
