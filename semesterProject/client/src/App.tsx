import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Importing the components/views
import LoginView from "./views/Login";
import Header from "./components/Header";
import Dashboard from "./views/Dashboard";
import CreateUser from "./views/CreateUser";
import {UserProvider} from "./contexts/UserContext";
import ShelterDetails from "./components/ShelterDetails";
import PetDetails from "./views/PetDetails";
import BrowsePets from "./components/BrowsePets";
import Shelters from "./views/Shelters";
import EditProfile from "./views/EditProfile";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <Header/>
                    <Routes>
                        <Route path="/login" index element={<LoginView/>}/>
                        <Route path="/signup" element={<CreateUser/>}/>
                        <Route path="/editProfile" element={<EditProfile/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/shelters/" element={<Shelters/>}/>
                        <Route path="/shelter/:id" element={<ShelterDetails/>}/>
                        <Route path="/pets/" element={<BrowsePets/>}/>
                        <Route path="/pet/:id" element={<PetDetails/>}/>


                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
