// SignUpPage.js
import React from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, VStack, Heading, Checkbox,
  Flex, Container
} from '@chakra-ui/react';
import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';

function SignUpPage() {
  const [inputs, setInputs] = useState({
    firstName: '',
    surname: '',
    birthDate: '',
    includeYear: false,
    postcode: '',
    language: '',
    nationality: '',
    maritalStatus: '',
    photo: '',
    photoOnCard: false,
    photoInDb: false,
    emailAddress: '',
    mobilePhoneNumber: ''
  });

  const { loading, error, signup } = useSignUp();

  const handleAuth = () => {
    console.log("inputs", inputs);
    // if (!inputs.firstName || !inputs.surname || !inputs.birthDate ||
    //   !inputs.postcode || !inputs.language || !inputs.nationality ||
    //   !inputs.maritalStatus) {
    //   alert("Please fill in all the fields");
    //   return;
    // }

    signup(inputs)
  };

  return (
    <>
      <Flex justifyContent={"center"} maxWidth={"6xl"}>
        <Container>
          <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={"yellow.100"}>
            <VStack spacing={4}>
              <Heading mb={4}>Sign Up</Heading>
              <FormControl id="first-name">
                <FormLabel>First Name*</FormLabel>
                <Input type="text" placeholder="Enter your first name"
                  value={inputs.firstName}
                  onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })} />
              </FormControl>
              <FormControl id="surname">
                <FormLabel>Surname*</FormLabel>
                <Input type="text" placeholder="Enter your surname"
                  value={inputs.surname}
                  onChange={(e) => setInputs({ ...inputs, surname: e.target.value })} />
              </FormControl>
              <FormControl id="birth-date">
                <FormLabel>Birth Date*</FormLabel>
                <Input type="date"
                  value={inputs.birthDate}
                  onChange={(e) => setInputs({ ...inputs, birthDate: e.target.value })} />
                <Checkbox id="includeYear"
                  onChange={(e) => setInputs({ ...inputs, includeYear: e.target.value })}>
                  Include Year?
                </Checkbox>
              </FormControl>
              <FormControl id="postcode">
                <FormLabel>Postcode*</FormLabel>
                <Input type='text'
                  value={inputs.postcode}
                  onChange={(e) => setInputs({ ...inputs, postcode: e.target.value })} />
              </FormControl>
              <FormControl id="language">
                <FormLabel>Preferred Language*</FormLabel>
                <Input type="text"
                  value={inputs.language}
                  onChange={(e) => setInputs({ ...inputs, language: e.target.value })} />
              </FormControl>
              <FormControl id="nationality">
                <FormLabel>Nationality*</FormLabel>
                <Input type="text"
                  value={inputs.nationality}
                  onChange={(e) => setInputs({ ...inputs, nationality: e.target.value })} />
              </FormControl>
              <FormControl id="marital">
                <FormLabel>Marital Status*</FormLabel>
                <Input type="text"
                  value={inputs.maritalStatus}
                  onChange={(e) => setInputs({ ...inputs, maritalStatus: e.target.value })}
                />
              </FormControl>
              <FormControl id="photo">
                <FormLabel>Photo</FormLabel>
                <Input type="file"
                  value={inputs.photo}
                  onChange={(e) => setInputs({ ...inputs, photo: e.target.value })} />
                <Flex justifyContent={"center"} gap={4}>
                <Checkbox id="photoOnCard"
                  onChange={(e) => setInputs({ ...inputs, photoOnCard: e.target.value })}>
                  Add Photo to Card
                </Checkbox>
                <Checkbox id="photoinDB"
                  onChange={(e) => setInputs({ ...inputs, photoInDb: e.target.value })}>
                  Add Photo to Database
                </Checkbox></Flex>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input type="email"
                  value={inputs.emailAddress}
                  onChange={(e) => setInputs({ ...inputs, emailAddress: e.target.value })} />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Mobile Phone Number</FormLabel>
                <Input type="text"
                  value={inputs.mobilePhoneNumber}
                  onChange={(e) => setInputs({ ...inputs, mobilePhoneNumber: e.target.value })} />
              </FormControl>
              <Button colorScheme="blue" onClick={handleAuth}>
                Sign Up
              </Button>
            </VStack>
          </Box>
        </Container>
      </Flex>
    </>
  );
}

export default SignUpPage;