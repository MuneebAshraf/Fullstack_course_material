import Person from "./Person";
//address type
type Address = {
    _id: string;
    street: string;
    city: string;
    zip: string;
    country: string;
    people: Person[];
}

export default Address;
