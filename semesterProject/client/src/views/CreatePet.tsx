import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {PetInput} from '../types'; // Import the PetInput type
import CREATE from '../graphql/mutations/Create'; // Assuming you save the mutation in a file named Create.ts
import GET_ALL from '../graphql/queries/GetAll';

const CreatePet: React.FC = () => {
    const [createPet] = useMutation(CREATE.PET);
    const {data: shelterData} = useQuery(GET_ALL.SHELTERS); // Assuming GET_ALL.SHELTERS is the query to get all shelters

    const [input, setInput] = useState<PetInput>({
        name: '',
        species: '',
        shelter: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPet({variables: {input}});
            alert('Pet created successfully!');
            setInput({
                name: '',
                species: '',
                shelter: '',
            });
        } catch (error:any) {
            console.error('Error creating pet:', error.message);
        }
    };

    return (
        <div className="container">
            <h2 className="card-title">Create a Pet</h2>
            <form onSubmit={handleSubmit} className="card">
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={input.name}
                        onChange={(e) => setInput({...input, name: e.target.value})}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Species</label>
                    <input
                        type="text"
                        className="form-control"
                        value={input.species}
                        onChange={(e) => setInput({...input, species: e.target.value})}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Shelter</label>
                    <select
                        className="form-control"
                        value={input.shelter}
                        onChange={(e) => setInput({...input, shelter: e.target.value})}
                        required
                    >
                        <option value="">Select a shelter</option>
                        {shelterData?.shelters.map((shelter: any) => (
                            <option key={shelter.id} value={shelter.id}>
                                {shelter.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn">
                    Create Pet
                </button>
            </form>
        </div>
    );
};

export default CreatePet;
