import {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import FindAddressByStreet from "../graphql/mutations/FindAddressByStreet";
import Address from "../types/Address";

type Props = {
    selectedAddressIds: string[];
    setSelectedAddressId: (addressId: string[]) => void;
}

const SearchSelectAddress = ({selectedAddressIds, setSelectedAddressId}:Props  ) => {
    const [input, setInput] = useState('');
    const [getAddresses, {loading}] = useMutation(FindAddressByStreet);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddresses, setSelectedAddresses] = useState<Address[]>([]);

    useEffect(() => {
        console.log(selectedAddressIds)
        if (input.length > 2) {
            //call getAdresses mutation and set data to the response
            getAddresses({variables: {street: input}})
                .then(
                (response) => setAddresses(response.data.findAddressByStreet)
            ).catch(
                (error) => console.error('error:', error)
            );
        }

    }, [input, getAddresses]);

    const handleAddressClick = (address:Address) => {
        setInput(address.street); // or any other main identifier of the address
        //push id to the end of setSelectedAddressId(address._id);
        setSelectedAddressId([...selectedAddressIds, address._id]);
        setSelectedAddresses([...selectedAddresses, address])
    };

    return (
        <>
            <input
                className={'input'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for an address..."
            />
            {loading && <p>Loading...</p>}
            {addresses && (
                <div className="results-dropdown">
                    {addresses.map((address:Address) => (
                        selectedAddressIds.includes(address._id) ? null :
                        <div key={address._id} onClick={() => handleAddressClick(address)}>
                            <p>{address.street}, {address.city}, {address.zip}, {address.country}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className={'selected-addresses'}>
                {selectedAddresses.map((address: Address) => (
                    <p key={address._id}>
                        {address.street}, {address.city}, {address.zip}, {address.country}
                    </p>
                ))}
            </div>
        </>
    );
}

export default SearchSelectAddress;
