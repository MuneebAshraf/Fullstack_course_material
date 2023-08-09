import {gql} from "@apollo/client";

const FindAddressByStreet = gql`
    mutation FindAddressByStreet($street: String!) {
        findAddressByStreet(street: $street) {
            _id
            city
            country
            street
            zip
        }
    }
`;

export default FindAddressByStreet;
