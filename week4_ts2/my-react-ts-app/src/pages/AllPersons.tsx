import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Person} from "../types/Person";

type Props = {
    people: Person[],
    setPeople: (people: Person[]) => void
}

const AddPersonForm: React.FC<Props> = ({people, setPeople}) => {

    const removeLastPerson = () => {
        // Remove the last person from the list
        const newPeople = [...people];
        newPeople.pop();
        setPeople(newPeople);
    };

    const sortByAge = () => {
        // Sort the list by age
        const sortedPeople = [...people].sort((a, b) => a.age - b.age);
        setPeople(sortedPeople);
    };

    return (
        <>
            <ul className={'body'}>
                {people.map(person => (
                    <li key={person.id}>
                        {person.name} - {person.age} - {person.occupation}
                        <Link to={`/update/${person.id}`}>Update</Link>
                    </li>
                ))}
            </ul>
            <button onClick={removeLastPerson}>Remove Last Person</button>
            <button onClick={sortByAge}>Sort By Age</button>
            <Link to={'/add'}>Add Person</Link>
        </>
    );
}

export default AddPersonForm;
