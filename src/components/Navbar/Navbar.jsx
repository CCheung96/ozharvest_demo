import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<Container maxW={"container.lg"} my={4}>
			<Flex w={"full"} justifyContent={{ base: "center", sm: "space-between" }} alignItems={"center"}>
				<Flex gap={4}>
					<Link to='/signup'>
						<Button backgroundColor={"yellow.100"} size={"sm"}>
							Sign Up
						</Button>
					</Link>
					<Link to='/search'>
						<Button backgroundColor={"yellow.100"} size={"sm"} >
							Search
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;
