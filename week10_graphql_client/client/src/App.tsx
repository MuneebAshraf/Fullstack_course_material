
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Importing the components/views
import PeopleList from './components/PeopleList';
import PersonDetails from './components/PersonDetails';
import CreatePerson from './components/CreatePerson';
// import CreateAddress from './components/CreateAddress';
// import AddPersonToAddress from './components/AddPersonToAddress';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
               <Routes>
                   <Route path="/" element={<PeopleList/>}/>
                   <Route path="/person/:id" element={<PersonDetails/>}/>
                   <Route path="/create-person" element={<CreatePerson/>}/>
                   {/*<Route path="/create-address" component={CreateAddress}/>*/}
                   {/*<Route path="/add-person-to-address" component={AddPersonToAddress}/>*/}
                   {/* You can add more routes as needed */}
               </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
