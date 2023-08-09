import {Link, Params, useParams, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {Person} from "../types/Person";

type Props = {
    people: Person[];
    updatePerson: (updatedPerson: Person) => void;
};

type Params = {
    id: string;
};

const UpdatePersonForm: React.FC<Props> = ({people, updatePerson}) => {
    const {id} = useParams<Params>();
    const person = people.find(person => person.id === Number(id));
    const navigate = useNavigate();
    // If the person is not found, return null or some error message
    if (!person) {
        return null;
    }

    const [name, setName] = useState(person.name);
    const [age, setAge] = useState<number | ''>(person.age);
    const [occupation, setOccupation] = useState(person.occupation);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && age && occupation) {
            const updatedPerson: Person = {
                id: person.id,
                name,
                age: Number(age),
                occupation
            };
            updatePerson(updatedPerson);
            navigate('/');
        }
    };

    return (
        <>
            <Link to={'/'}>Back</Link>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number"/>
                <input value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="Occupation"/>
                <button type="submit">Update Person</button>
            </form>
        </>
    );
};

export default UpdatePersonForm;
