import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Uncomment import statement below after building queries and mutations
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
