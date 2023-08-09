const address = `#graphql
    type Address {
    _id: ID
    street: String
    city: String
    zip: String
    country: String
    people: [Person]
}
`;
export default address;
