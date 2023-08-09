import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import {Person as PersonType} from './types/Person';
import PersonList from './components/PersonList';
import UpdatePersonForm from './components/UpdatePersonForm';
import AddPersonForm from './components/AddPersonForm';

const App: React.FC = () => {
    const [people, setPeople] = useState<PersonType[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/people')
            .then(response => response.json())
            .then(data => setPeople(data));
    }, []);

    const addPerson = (person: PersonType) => {
        fetch('http://localhost:3001/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })
            .then(response => response.json())
            .then(data => setPeople(prevPeople => [...prevPeople, data]));
    };

    const deletePerson = (id: number) => {
        fetch(`http://localhost:3001/people/${id}`, {
            method: 'DELETE',
        })
            .then(() => setPeople(prevPeople => prevPeople.filter(person => person.id !== id)));
    };

    const updatePerson = (updatedPerson: PersonType) => {
        fetch(`http://localhost:3001/people/${updatedPerson.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPerson),
        })
            .then(response => response.json())
            .then(data => setPeople(prevPeople => prevPeople.map(person => person.id === data.id ? data : person)));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PersonList people={people} deletePerson={deletePerson}/>} />
                <Route path="add" element={<AddPersonForm people={people} addPerson={addPerson}/>}/>
                <Route path="edit/:id" element={<UpdatePersonForm people={people} updatePerson={updatePerson}/>} />
            </Routes>
        </Router>
    );
};

export default App;
