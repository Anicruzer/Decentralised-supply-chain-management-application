import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button, InputGroup, InputLeftAddon, Input, InputRightAddon, Highlight, FormControl, FormHelperText, FormErrorMessage, Card, CardHeader, CardBody, Divider, shouldForwardProp
} from '@chakra-ui/react';

import { Logo } from './Logo';
import { Heading } from '@chakra-ui/react';
import axios, { Axios } from 'axios';
import Home from './Components/Home';

import { Routes, Route } from 'react-router-dom';
import Forms from './Components/Forms';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import ScanShipment from './Components/ScanShipment';
import AddProduct from './Components/AddProduct';
import ProductStatus from './Components/ProductStatus';
import AddHub from './Components/AddHub';
import Navbar from './Components/Navbar';

function App() {



  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        
          <Navbar/>
        <Routes>
          <Route path="home" element={<Home/>} />
          <Route path="/forms" element={<Forms />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/product-status" element={<ProductStatus/>}/>
          <Route path="/add-products" element={<AddProduct />}/>
          <Route path="/add-hub" element={<AddHub />}/>
          <Route path="/scan-shipment" element={<ScanShipment />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/" element={<Home />}>
          
         
         
            {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
            <Route path="*" element={<h1>Error!</h1>} />
          </Route>
        </Routes>
          
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
