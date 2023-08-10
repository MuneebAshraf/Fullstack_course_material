import {gql} from '@apollo/client';

const PET = gql`
    query FetchPetDetails($id: ID!) {
        pet(id: $id) {
            id
            name
            species
            shelter {
                id
                name
            }
        }
    }
`;

const USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            username
            email
            adoptionRequests {
                id
                status
            }
        }
    }
`;

const SHELTER = gql`
    query GetShelterDetails($shelterId: ID!) {
        shelter(id: $shelterId) {
            id
            name
            address
            email
            pets {
                id
                name
                species
                adoptionRequests {
                    id
                    status
                }
            }
        }
    }
`;

const ADOPTION_REQUEST = gql`
    query GetAdoptionRequest($id: ID!) {
        adoptionRequest(id: $id) {
            id
            status
            pet {
                id
                name
            }
        }
    } 
`;



const GET_BY_ID = {
    PET,
    SHELTER,
    USER,
    ADOPTION_REQUEST
}

export default GET_BY_ID;
