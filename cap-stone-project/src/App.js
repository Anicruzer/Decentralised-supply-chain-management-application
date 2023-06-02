import React, { useEffect, useState } from 'react';
import {
    Heading,
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    Highlight, Input
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import About from './Components/About';
import ScanShipment from './Components/ScanShipment';
import AddProduct from './Components/AddProduct';
import ProductStatus from './Components/ProductStatus';
import AddHub from './Components/AddHub';
import Navbar from './Components/Navbar';
import { contractAbi, contractAddress } from './ContractInfo';
import { ethers } from 'ethers';
import AllProducts from './Components/AllProducts';


function App() {
    //Whether wallet is connected ot not
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    //The wallet address of the currently connected wallet
    const [connectedAccount, setConnectedAccount] = useState('');
    //Whether the user is from the Company or a Hub
    const [role, setRole] = useState('');
    // Registering new company
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)


    //Check if a wallet is connected to the site and connect it if not.
    const handleConnectWallet = async () => {
        console.log('Button Clicked');
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request user to connect their wallet
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                const connectedAddress = accounts[0];
                console.log(connectedAddress);

                setConnectedAccount(connectedAddress);
                setIsWalletConnected(true);
                //Connect to contract
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractAbi,
                    signer
                );

                console.log('contract connected');
                const loginCheck1 = await contract.login();

                console.log(loginCheck1.toString());
                if (loginCheck1.toString() == '2') {
                    setRole('Company');
                    console.log('It is a company');

                } else if (loginCheck1.toString() == '1') {
                    setRole('Hub');
                    console.log('It is a Hub');

                } else {
                    console.log('Not Registered with this website before');
                    setRole('New');

                }

              
                console.log('contract executed');
            } catch (error) {
                console.error('Error:', error);
                // Handle error connecting wallet
            }
        } else {
            console.warn('MetaMask extension not detected');
            // Show message to install MetaMask extension
        }
    };

    const handleRegisterButton = async () => {

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    contractAddress,
                    contractAbi,
                    signer
                );

                console.log('contract connected');

                const registrationCompany = await contract.registerCompany(value);
                console.table(registrationCompany);

                setRole("Company");
                setButtonClick(false);



            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }


    }

    const [buttonClick, setButtonClick] = useState(false);
    const handleButtonClick = () => {
        setButtonClick(true);
        handleConnectWallet();
    }

    useEffect(() => handleConnectWallet, []);
    useEffect(() => console.log(role), [role]);

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <Box>

                        {!isWalletConnected ? (
                            <VStack spacing={8} m="10vw">
                                <Heading as="h1" size={{ base: '2xl', md: '3xl', lg: '4xl' }}>
                                    Supply Chain Dapp
                                </Heading>
                                <Text fontSize="2xl" as="em">
                                    <Highlight
                                        query={['decentralised']}
                                        styles={{
                                            px: '3',
                                            py: '1',
                                            rounded: 'full',
                                            bg: 'teal.100',
                                        }}
                                    >
                                        A decentralised Platform to manage your product shipping
                                        requirements!
                                    </Highlight>
                                </Text>
                                <Button mx="1vw" onClick={handleButtonClick}>
                                    Connect Wallet
                                </Button>
                            </VStack>
                        ) : (role == 'New' ? (
                            <>  
                                <Box>
                                    <Text>Welcome new user!</Text>
                                    <Text>If you are a Hub, contact your company to add your wallet address as an authorised Hub!</Text>
                                    <Text>If you are a Company, Enter your name below to register as a new company!</Text>
                                    <Input
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='Company Name'
                                        size='sm'
                                    />
                                    <Button onClick={handleRegisterButton}> Register</Button>

                                </Box>
                            </>
                        ) : (
                            <Box>
                                <Navbar role={role} />
                                <Box
                                    style={{
                                        marginTop: '5vh',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Routes>
                                        <Route path="/about" element={<About />} />
                                        {role == 'Company' ? (
                                            <>
                                                <Route path="/product-status" element={<ProductStatus />} />
                                                <Route path="/all-product-status" element={<AllProducts />} />
                                                <Route path="/add-products" element={<AddProduct />} />
                                                <Route path="/add-hub" element={<AddHub />} />
                                            </>
                                        ) : (
                                            <Route path="/scan-shipment" element={<ScanShipment />} />
                                        )}

                                        <Route path="/" element={<ProductStatus />}>
                                            <Route path="*" element={<h1>Error!</h1>} />
                                        </Route>
                                    </Routes>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Box>
        </ChakraProvider>
    );
}

export default App;
