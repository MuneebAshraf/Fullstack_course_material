import {useState} from 'react';
import {useMutation} from '@apollo/client';
import CREATE_PERSON from "../graphql/mutations/CreatePerson";
import SearchSelectAddress from './SearchSelectAddress';
import {Link} from "react-router-dom";

const CreatePerson = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [selectedAddressIds, setSelectedAddressIds] = useState<string[]>([])

    const [createPerson] = useMutation(CREATE_PERSON);
    const handleSubmit = async () => {
        try {
            const response = await createPerson({
                variables: {
                    name,
                    age,
                    email,
                    phone,
                    imageUrl: 'https://picsum.photos/500/300',
                    addressId: selectedAddressIds
                }
            });
            console.log('Person created:', response);
        } catch (error:any ) {
            console.error('Failed to create person:', error.message);
        }
    };

    return (
        <div className={'container'}>
            <Link to={'/'}>Back</Link>
            <h1>Create Person</h1>
            <div className={'form-control'}>
                <div>
                    <label>Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Age:</label>
                    <input value={age} onChange={(e) => setAge(Number(e.target.value))}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Phone:</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div>
                    <label>Address:</label>
                    <SearchSelectAddress selectedAddressIds={selectedAddressIds} setSelectedAddressId={setSelectedAddressIds}/>
                </div>
                <button className={'btn'} onClick={handleSubmit}>Create</button>
            </div>
        </div>
    );
};

export default CreatePerson;
