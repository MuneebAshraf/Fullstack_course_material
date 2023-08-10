// types.ts

// User Type
export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    adoptionRequests: string[]; // Array of AdoptionRequest IDs
    reviews: string[]; // Array of Review IDs
};

// Pet Type
export type Pet = {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    description: string;
    adoptionRequests: string[]; // Array of AdoptionRequest IDs
    adoptedBy?: string; // User ID (if the pet is adopted)
};

// AdoptionRequest Type
export type AdoptionRequest = {
    id: string;
    userId: string; // User ID
    petId: string; // Pet ID
    status: 'Pending' | 'Approved' | 'Rejected';
};

// Review Type
export type Review = {
    id: string;
    content: string;
    rating: number;
    userId: string; // User ID
    petId: string; // Pet ID
};
