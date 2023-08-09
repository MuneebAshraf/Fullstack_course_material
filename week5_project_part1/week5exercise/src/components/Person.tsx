import React from 'react';
import {Person as PersonType} from '../types/Person';


const Person: React.FC<PersonType> = ({firstName, lastName, age, address}) => {
    return (
        <>
            {firstName} {lastName}, {age} years old
            <p>{address.street}, {address.city}, {address.zipCode}, {address.country}</p>

        </>
    );
};


export default Person;
