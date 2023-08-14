import {gql} from "@apollo/client";

// Mutation for updating a user
const USER = gql`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
        updateUser(id: $id, input: $input) {
            id
            username
            email
        }
    }
`;

// Mutation for updating a pet
const PET = gql`
    mutation UpdatePet($id: ID!, $input: PetInput!) {
        updatePet(id: $id, input: $input) {
            id
            name
            species
            shelter {
                name
            }
        }
    }
`;

// Mutation for updating an adoption request
const ADOPTION_REQUEST = gql`
    mutation UpdateAdoptionRequest($id: ID!, $input: AdoptionRequestInput!) {
        updateAdoptionRequest(id: $id, input: $input) {
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

// Mutation for updating a shelter
const SHELTER = gql`
    mutation UpdateShelter($id: ID!, $input: ShelterInput!) {
        updateShelter(id: $id, input: $input) {
            id
            name
            address
            email
        }
    }
`;

const UPDATE = {
    USER,
    PET,
    ADOPTION_REQUEST,
    SHELTER
}

export default UPDATE;
