import React, {useState, useEffect} from 'react';
import {Person} from "./types/Person";
import AddPersonForm from "./pages/AddPersonForm";
import UpdatePersonForm from "./pages/UpdatePersonForm";
import AllPersons from "./pages/AllPersons";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
    const [person, setPerson] = useState<Person>();
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        // Fetch people from the json-server
        fetch('http://localhost:3001/people')
            .then(response => response.json())
            .then(data => setPeople(data));
    }, []);

    const addPerson = (person: Person) => {
        // Add a new person to the list
        setPeople([...people, person]);
    };

    const updatePerson = (updatedPerson: Person) => {
        setPeople(prevPeople => {
            return prevPeople.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person
            );
        });
    };


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllPersons people={people} setPeople={setPeople}/>}/>
                <Route path="add" element={<AddPersonForm addPerson={addPerson} />}/>
                <Route path="update/:id" element={<UpdatePersonForm people={people} updatePerson={updatePerson}/>}/>
            </Routes>
        </BrowserRouter>
    );

}
