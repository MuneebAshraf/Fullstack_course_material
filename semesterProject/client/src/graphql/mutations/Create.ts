import {gql} from "@apollo/client";

// Mutation for creating a user
const USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            username
            email
        }
    }
`;

// Mutation for creating a pet
const PET = gql`
    mutation CreatePet($input: PetInput!) {
        createPet(input: $input) {
            id
            name
            species
            shelter {
                name
            }
        }
    }
`;

// Mutation for creating an adoption request
const ADOPTIONREQUEST = gql`
    mutation CreateAdoptionRequest($input: AdoptionRequestInput!) {
        createAdoptionRequest(input: $input) {
            id
            status
            user {
                username
            }
            pet {
                name
            }
        }
    }
`;

// Mutation for creating a shelter
const SHELTER = gql`
    mutation CreateShelter($input: ShelterInput!) {
        createShelter(input: $input) {
            id
            name
            address
            email
        }
    }
`;

const CREATE = {
    USER,
    PET,
    ADOPTIONREQUEST,
    SHELTER
}

export default CREATE;
