import {gql} from "@apollo/client";

const GET_PEOPLE = gql`
    query People {
        people {
            name
            _id
            email
            age
            phone
            addresses {
                _id
                zip
                street
                country
                city
            }
        }
    }
`;

export default GET_PEOPLE;
