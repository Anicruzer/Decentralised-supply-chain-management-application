import { Heading } from '@chakra-ui/react';
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
import React from 'react';


function Home() {
  return (
      <VStack spacing={8} m="10vw">
    
      <Heading as="h1" size={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        Supply Chain Dapp
      </Heading>
      <Text fontSize="2xl" as="em">
        <Highlight
          query={['decentralised']}
          styles={{ px: '3', py: '1', rounded: 'full', bg: 'teal.100' }}
        >
          A decentralised Platform to manage your product shipping requirements!
        </Highlight>
      </Text>
      <Box
      
      >
      <a href="/forms"><Button mx="1vw"> Login </Button></a>
      <a href="/forms"><Button bg='teal.200' color="black"> Signup </Button></a>
      </Box>
      
      </VStack>
    
  );
}

export default Home;
