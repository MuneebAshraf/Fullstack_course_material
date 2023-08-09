import {gql} from '@apollo/client';

export const CREATE_PERSON = gql`
  mutation CreatePerson($name: String!, $email: String!, $phone: String!, $imageUrl: String!, $age: Int!, $addressId: [ID]) {
    createPerson(name: $name, email: $email, phone: $phone, imageUrl: $imageUrl, age: $age, addressId: $addressId) {
      _id
      age
      email
      name
      imageUrl
      phone
      addresses {
        _id
        city
        country
        street
        zip
      }
    }
  }
    `;
export default CREATE_PERSON;
