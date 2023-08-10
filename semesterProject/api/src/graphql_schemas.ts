const typeDefs = `#graphql
# User Type
type User {
    id: ID!
    username: String!
    email: String!
    adoptionRequests: [AdoptionRequest!]!
    isAdmin: Boolean!
}

# Pet Type
type Pet {
    id: ID!
    name: String!
    species: String!
    shelter: Shelter
    adoptionRequests: [AdoptionRequest!]!
}

# AdoptionRequest Type
type AdoptionRequest {
    id: ID!
    user: User!
    pet: Pet!
    status: AdoptionStatus!
}

enum AdoptionStatus {
    PENDING
    APPROVED
    REJECTED
}

# Shelter Type
type Shelter {
    id: ID!
    name: String!
    address: String!
    email: String!
    pets: [Pet!]!
}

# Queries
type Query {
    users: [User!]!
    pets: [Pet!]!
    adoptionRequests: [AdoptionRequest!]!
    shelters: [Shelter!]!
    user(id: ID!): User
    pet(id: ID!): Pet
    adoptionRequest(id: ID!): [AdoptionRequest]!
    shelter(id: ID!): Shelter
}

# Mutations
type Mutation {
    login(input: UserInput): User
    createUser(input: UserInput!): User!
    createPet(input: PetInput!): Pet!
    createAdoptionRequest(input: AdoptionRequestInput!): AdoptionRequest!
    createShelter(input: ShelterInput!): Shelter!
    updateUser(id: ID!, input: UserInput!): User!
    updatePet(id: ID!, input: PetInput!): Pet!
    updateAdoptionRequest(id: ID!, input: AdoptionRequestInput!): AdoptionRequest!
    updateShelter(id: ID!, input: ShelterInput!): Shelter!
    deletePet(id: ID!): Boolean!
    deleteAdoptionRequest(id: ID!): Boolean!
    deleteShelter(id: ID!): Boolean!
    deleteUser(id: ID!): Boolean!
}

# Input Types
input UserInput {
    username: String!
    email: String
    password: String!
}

input PetInput {
    name: String!
    species: String!
    shelter: ID!
}

input AdoptionRequestInput {
    user: ID!
    pet: ID!
    status: AdoptionStatus!
}


input ShelterInput {
    name: String!
    address: String!
    email: String!
}
`;
export default typeDefs;
