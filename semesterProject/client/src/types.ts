// types.ts

// User Type
export type User = {
    id: string;
    username: string;
    email: string;
    adoptionRequests: AdoptionRequest[];
}

// Pet Type
export type Pet = {
    id: string;
    name: string;
    species: string;
    shelter: Shelter;
    adoptionRequests: AdoptionRequest[];
}

// AdoptionRequest Type
export type AdoptionRequest = {
    id: string;
    user: User;
    pet: Pet;
    status: AdoptionStatus;
}

export enum AdoptionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

// Shelter Type
export type Shelter = {
    id: string;
    name: string;
    address: string;
    email: string;
    pets: Pet[];
}

// Input Types
export type UserInput = {
    username: string;
    email?: string;
    password: string;
}

export type PetInput = {
    name: string;
    species: string;
    shelter: string; // Assuming this is the ID of the shelter
}

export type AdoptionRequestInput = {
    user?: string; // Assuming this is the ID of the user
    pet?: string; // Assuming this is the ID of the pet
    status: AdoptionStatus;
}

export type ShelterInput = {
    name: string;
    address: string;
    email: string;
}
