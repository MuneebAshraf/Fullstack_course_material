import {gql} from '@apollo/client';

const GET_PERSON = gql`
    query Query($id: ID!) {
  person(_id: $id) {
    _id
    name
    imageUrl
    email
    age
    phone
    addresses {
      _id
      city
      country
      street
      zip
    }
  }
}`;

export default GET_PERSON;
