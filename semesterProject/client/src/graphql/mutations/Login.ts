import {gql} from "@apollo/client";

const LOGIN = gql`
    mutation Login($input: UserInput) {
        login(input: $input) {
            email
            id
            username
            isAdmin
        }
    }
`;

export default LOGIN;
