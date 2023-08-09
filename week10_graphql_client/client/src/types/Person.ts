//type Person
import Address from "./Address";

type Person = {
    _id: string;
    name: string;
    email: string;
    age: number;
    phone: string;
    imageUrl: string;
    addresses: Address[];
}

export default Person;
