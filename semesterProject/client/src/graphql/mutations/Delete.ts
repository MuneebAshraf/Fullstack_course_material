import {gql} from "@apollo/client";

// Mutation for deleting a user
const USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;

// Mutation for deleting a pet
const PET = gql`
    mutation DeletePet($id: ID!) {
        deletePet(id: $id)
    }
`;

// Mutation for deleting an adoption request
const ADOPTIONREQUEST = gql`
    mutation DeleteAdoptionRequest($id: ID!) {
        deleteAdoptionRequest(id: $id)
    }
`;

// Mutation for deleting a shelter
const SHELTER = gql`
    mutation DeleteShelter($id: ID!) {
        deleteShelter(id: $id)
    }
`;

const DELETE = {
    USER,
    PET,
    ADOPTIONREQUEST,
    SHELTER
}

export default DELETE;
