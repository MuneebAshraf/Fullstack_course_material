const mutation = `#graphql
    type Mutation {
    createAddress(street: String!, city: String!, zip: String!, country: String!): Address

    addPersonToAddress(personId: ID!, addressId: ID!): Address

    addAddressToPerson(personId: ID!, addressId: ID!): Person

    removePersonFromAddress(personId: ID!, addressId: ID!): Person

    createPerson(name: String!, age: Int!, email: String!, phone: String!, imageUrl: String!, addressId: ID): Person

    updatePerson(id: ID!, name: String!, age: Int!, email: String!, addressId: ID, phone: String!): Person

    deletePerson(id: ID!): Person

    }
`;
export default mutation;
