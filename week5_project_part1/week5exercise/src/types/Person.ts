export interface Address {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
}
