import {gql} from "@apollo/client";

const USERS = gql`
    query GetAllUsers {
        users {
            id
            username
            email
        }
    }

`;
const PETS = gql`
    query GetAllPets {
        pets {
            id
            name
            species
            shelter {
                name
                id
            }
        }
    }
`;
const ADOPTION_REQUESTS = gql`
    query GetAllAdoptionRequests {
        adoptionRequests {
            id
            status
            user {
                id
                username
            }
            pet {
                id
                name
            }
        }
    }
`;
const SHELTERS = gql`
    query GetAllShelters {
        shelters {
            id
            name
            address
            email
        }
    }

`;

const GET_ALL = {
    USERS,
    PETS,
    ADOPTION_REQUESTS,
    SHELTERS
}

export default GET_ALL;
