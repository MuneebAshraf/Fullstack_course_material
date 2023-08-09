const query = `#graphql
    type Query {
    people: [Person]!
    addresses: [Address]!
    peopleOnAddress(_id:ID!): Address
    person(_id: ID!): Person
}
`;

export default query;
