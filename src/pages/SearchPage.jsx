// SearchPage.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  VStack, Select, Button, Heading, Box, Input, FormLabel,
  Text, Flex, Image, UnorderedList, ListItem
} from '@chakra-ui/react';
import MemberModal from '../components/Modal/MemberModal';
import useBirthdayFormatter from '../hooks/useBirthdayFormatter';
import useShowToast from '../hooks/useShowToast';
import useCapitalise from '../hooks/useCapitalise';

function SearchPage() {
  // A list of possible search criteria
  const [searchOptions, setSearchOptions] = useState([
    // { value: 'firstName', label: 'First Name' },
    { value: 'surname', label: 'Surname' },
    { value: 'birthDay', label: 'Birth Day (Year not included)' },
    { value: 'birthYear', label: 'Birth Year' },
    { value: 'postcode', label: 'Postcode' },
    { value: 'language', label: 'Language' },
    { value: 'nationality', label: 'Nationality' },
    { value: 'maritalStatus', label: 'Marital Status' },
    { value: 'email', label: 'Email' },
    { value: 'mobilePhoneNumber', label: 'Mobile Phone Number' },
  ]);
  const [searchInputs, setSearchInputs] = useState({
    "firstName": ""
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState([
    { value: "firstName", label: "First Name" }
  ]);
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]); // Default search criteria
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // Member selected for modal display

  const formattedBday = useBirthdayFormatter();
  const showToast = useShowToast();

  const handleAddToCriteria = () => {
    setSelectedCriteria([
      ...selectedCriteria,
      selectedOption
    ]);

    setSearchInputs(prevState => ({
      ...prevState,
      [selectedOption.value]: "",
    }));

    // Remove the selected criterion from searchOptions
    setSearchOptions(prevOptions => (
      prevOptions.filter(option => option.value !== selectedOption.value)
    ));
    setSelectedOption(searchOptions[0]);

  }

  useEffect(() => {
    // Update selected option after searchOptions have been updated
    setSelectedOption(searchOptions[0]);
  }, [searchOptions]);

  // Function to update input values for criteria dynamically
  const handleInputChange = (key, value) => {
    setSearchInputs(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelectedOptionChange = (value) => {
      const selectedOption = searchOptions.find(option => option.value === value);
      console.log(selectedOption);
  setSelectedOption(selectedOption); // Update the state with the selected option object
  }

  const handleSearch = async () => {
    try {
      // Create a Firestore query to search for members based on the provided search term and criteria
      let firestoreQuery = collection(firestore, 'members');

      // Iterate over each key-value pair in searchInputs
      Object.entries(searchInputs).forEach(([key, value]) => {
        // If the value is not empty, add a where clause to the query
        if (value.trim() !== "") {
          const searchValue = value.toLowerCase();
          firestoreQuery = query(firestoreQuery, where(key, '==', searchValue));
        }
      });

      // Execute the query
      const querySnapshot = await getDocs(firestoreQuery);

      // Extract search results from the query snapshot
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for members:', error)
      showToast('Error searching for members:', error.message, "error");
    }
  };

  function handleOpenModal(member) {
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
            value={selectedOption.value}
            onChange={(e) => handleSelectedOptionChange(e.target.value)}
          >
            {/* Dropdown list of search criteria */}
            {searchOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Button onClick={handleAddToCriteria}>Add to Criteria</Button>
          {selectedCriteria.map(({ value, label }) => (
            <Input
              key={value}
              type="text"
              value={searchInputs[value] || ''}
              onChange={(e) => handleInputChange(value, e.target.value)}
              placeholder={`Search by ${label}`}
            />
          ))}

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
                  <Text>Name: {useCapitalise(member.firstName)} {useCapitalise(member.surname)}</Text>
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
        ? <MemberModal selectedMember={selectedMember} onClose={handleCloseModal} />
        : null}
    </VStack>
  );
};

export default SearchPage;

