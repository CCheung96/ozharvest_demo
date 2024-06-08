import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';



function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/search' element={<SearchPage />}/>
      <Route path='/signup' element={<SignUpPage />}/>
    </Routes>
  </>

  );
}

export default App;
