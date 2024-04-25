// SearchPage.js
import React, { useState } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  VStack, Select, Button, Heading, Box, Input, FormLabel,
  Text, Flex, Image, UnorderedList, ListItem
} from '@chakra-ui/react';
import MemberModal from '../components/Modal/MemberModal';
import useBirthdayFormatter from '../hooks/useBirthdayFormatter';

function SearchPage() {
  // A list of possible search criteria
  const searchOptions = [
    { value: 'firstName', label: 'First Name' },
    { value: 'surname', label: 'Surname' },
    { value: 'birthDay', label: 'Birth Day (Year not included)' },
    { value: 'birthDate', label: 'Birth Date' },
    { value: 'postcode', label: 'Postcode' },
    { value: 'language', label: 'Language' },
    { value: 'nationality', label: 'Nationality' },
    { value: 'maritalStatus', label: 'Marital Status' },
    { value: 'email', label: 'Email' },
    { value: 'mobilePhoneNumber', label: 'Mobile Phone Number' },
  ];
  // const [selectedCriteria, setSelectedCriteria] = useState(["firstName"]);
  // const [searchInputs, setSearchInputs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState(searchOptions[0].value); // Default search criteria
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // Member selected for modal display

  const formattedBday = useBirthdayFormatter();

  const handleSearch = async () => {
    try {
      console.log(searchCriteria, searchTerm)
      // Create a Firestore query to search for members based on the provided search term and criteria
      const q = query(
        collection(firestore, 'members'),
        where(searchCriteria, '==', searchTerm)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Extract search results from the query snapshot
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for members:', error);
    }
  };

  function handleOpenModal(member) {
    console.log("This member is selected", member);
    setSelectedMember(member);
  }

  function handleCloseModal() {
    setSelectedMember(null);
  }

  return (
    <VStack spacing={4} alignItems={"center"}>
      <Heading mb={4}>Member Search</Heading>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={"yellow.100"}>
        <VStack spacing={4}>
          <FormLabel>Search By:</FormLabel>
          <Select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            {/* Dropdown list of search criteria */}
            {searchOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchCriteria}`}
          />
          <Button onClick={handleSearch}>Search</Button>
        </VStack>
      </Box>

      {searchResults.length > 0
        ? <Heading size={"md"}>Search Results:</Heading>
        : <Heading size={"md"}> No Search Results</Heading>}

      <UnorderedList listStyleType={"none"}>
        {searchResults.map((member) => (
          <ListItem key={member.id}>
            {/* <Link to={`/profile/${member.id}`}> */}
              <Box p={8} maxWidth="full" borderWidth={1} borderRadius={8} 
              boxShadow="lg" bg={"white"} cursor={"pointer"} 
              onClick={() => handleOpenModal(member)}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
                  {/*Left Hand Side */}
                  <Image src='gibbresh.png' fallbackSrc='https://via.placeholder.com/100' />
                  {/*Right Hand Side */}
                  <VStack spacing={4}>
                    <Text>Name: {member.firstName} {member.surname}</Text>
                    <Text>Birthday: {formattedBday(member.birthDay, member.birthYear)}</Text>
                    <Text>Postcode: {member.postcode}</Text>
                  </VStack>
                </Flex>
              </Box>
            {/* </Link> */}
          </ListItem>
        ))}
      </UnorderedList>

      {/* Member Details Modal */}
      {selectedMember 
      ? <MemberModal selectedMember={selectedMember} onClose={handleCloseModal}/> 
      : null}
    </VStack>
  );
};

export default SearchPage;

