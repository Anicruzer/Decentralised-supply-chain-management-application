import { Box, Tag, Button } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = () => {
return (
<Box
styles={{
display: "flex",
flexDirection: "row",
justifyContent: "flex-start",
alignItems: "center",
height: "60px",
backgroundColor: "white",
color: "#fff",
paddingY:"6vh"
}}
>
<a href = "/add-products"><Button style={{ margin: "0 20px", fontSize: "18px" }}>Add Products</Button></a>
<a href = "/scan-shipment"><Button style={{ margin: "0 20px", fontSize: "18px" }}>Scan Shipment</Button></a>
<a href = "/add-hub"><Button style={{ margin: "0 20px", fontSize: "18px" }} >Add Hub</Button></a>
<a href = "/product-status"><Button style={{ margin: "0 20px", fontSize: "18px" }} >Product Status</Button></a>
<a href = "/about"><Button style={{ margin: "0 20px", fontSize: "18px" }}>About</Button></a>
<ColorModeSwitcher justifySelf="flex-end" />
</Box>
);
};

export default Navbar;
