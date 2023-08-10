# Pet Adoption Platform

## 📌 Project Overview

The Pet Adoption Platform is a full-stack TypeScript application designed to bridge the gap between animal shelters and
potential pet adopters. Users can browse available pets, submit adoption requests, and shelters can manage their
available pets and review adoption applications.

### 🎯 Purpose

The primary goal of this platform is to simplify and streamline the pet adoption process, making it easier for users to
find their perfect pet companion and for shelters to manage and track adoption requests.

### 📊 Models and Relations

- **User**: Contains user details, authentication data, and adoption history.
    - Can submit multiple AdoptionRequests.
    - Can write reviews for shelters.

- **Pet**: Details about a pet, including species, age, health status, and description.
    - Belongs to a Shelter.
    - Can have multiple AdoptionRequests.

- **AdoptionRequest**: A user's request to adopt a specific pet.
    - Relates a User to a Pet.

- **Shelter**: Details about animal shelters, including location, contact info, and available pets.
    - Can have multiple Pets.
    - Can receive reviews from Users.

### 🛠 Tech Stack

- **Backend**:
    - **Node.js** with **Express** for the server.
    - **Mongoose** for MongoDB database interactions.
    - **Apollo Server** for GraphQL API.

- **Frontend**:
    - **React** with TypeScript for the user interface.
    - **Apollo Client** for GraphQL communication with the backend.

## 🚀 Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and update the connection string in the configuration.
4. Start the backend server using `npm run start:server`.
5. Start the frontend application using `npm run start:client`.
6. Navigate to the provided localhost URL in your browser.

## 💡 Project Idea

The idea behind this platform is to provide a centralized location where potential pet adopters can view available pets
from various shelters, submit adoption requests, and provide feedback on their adoption experiences. Shelters can manage
their pet listings, review adoption requests, and gain insights from user feedback.
