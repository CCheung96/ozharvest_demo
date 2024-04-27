import React, { useState } from 'react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Input
} from '@chakra-ui/react';
import { Text, Button, Flex, Image, VStack, Textarea } from '@chakra-ui/react';
import useCreateVisit from '../../hooks/useCreateVisit';
import useCheckVisit from '../../hooks/useCheckVisit';
import useShowToast from '../../hooks/useShowToast';
import useAssignCard from '../../hooks/useAssignCard';
import useSubmitNote from '../../hooks/useSubmitNote';
import useBirthdayFormatter from '../../hooks/useBirthdayFormatter';
import useCapitalise from '../../hooks/useCapitalise';


const MemberModal = ({ selectedMember, onClose }) => {
  const [member, setMember] = useState(selectedMember);
  const [denied, setDenied] = useState(false);
  const [deniedReason, setDeniedReason] = useState('');
  const [newCard, setNewCard] = useState(false);
  const [cardId, setCardId] = useState('');
  const [checkComplete, setCheckComplete] = useState(false);
  const createVisit = useCreateVisit();
  const checkVisit = useCheckVisit();
  const showToast = useShowToast();
  const assignCard = useAssignCard();
  const submitNote = useSubmitNote();
  const formattedBirthday = useBirthdayFormatter();

  function handleCloseModal() {
    setMember(null);
    onClose();
  }

  async function handleConfirmation() {
    // Check if another visit has occured within the same week
    const alreadyVisited = await checkVisit(member.id);
    if (alreadyVisited) {
      showToast("Repeat Visit",
        "This member has already visited this week", "error");
      // Submit a note about repeat visit
      submitNote(member.id, "Repeat Visit", "")
      setDenied(true)
      return;
    }
    // Create a new visit
    await createVisit(member.id);
    setCheckComplete(true);
    // Close modal
    // TO DO
  }

  function handleDenial() {
    // TODO
    setDenied(true);
    // setCheckComplete(true);
  }

  function handleDenialNote() {
    submitNote(member.id, "Denial of Entry", deniedReason)
  }

  function handleNewCard() {
    assignCard(member.id, cardId)
  }
  return (
    <div>
      <Modal isOpen={member !== null} onClose={handleCloseModal} >
        <ModalOverlay />
        <ModalContent maxWidth={"fit-content"}>
          <ModalHeader>Member Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {member && (<>
              <Flex justifyContent={"center"} alignItems={"center"} gap={5} flexWrap={"wrap"}>
                {/* Left Hand Side */}
                <Image src={member.photoURL} fallbackSrc='https://via.placeholder.com/300' w={300} h={300}/>
                {/* Right Hand Side */}
                <VStack>
                  <Text>Name: {useCapitalise(member.firstName)} {useCapitalise(member.surname)}</Text >
                  <Text>Born: {formattedBirthday(member.birthDay, member.birthYear)} </Text>
                  <Text>Postcode: {member.postcode}</Text>
                  <Text>Preferred Language: {useCapitalise(member.language)}</Text>
                  <Text>Nationality: {useCapitalise(member.nationality)}</Text>
                  <Text>Marital Status: {useCapitalise(member.maritalStatus)}</Text>
                  <Text>Email: {member.emailAddress || "Not Provided"}</Text>
                  <Text>Mobile Phone Number: {member.mobilePhoneNumber || "Not Provided"}</Text>
                </VStack>
              </Flex>
              {/* Render denied reason input section if the deniedReasonInput flag is set */}
              {denied && (
                <>
                  <Text>You are denying entry</Text>
                  <Textarea
                    value={deniedReason}
                    onChange={(e) => setDeniedReason(e.target.value)}
                    placeholder="Enter reason for denial"
                    size="md"
                    resize="vertical"
                  />
                </>
              )}
              {newCard && (
                <>
                  <Text>Add the code for the new card</Text>
                  <Input
                    type="text"
                    value={cardId}
                    onChange={(e) => setCardId(e.target.value)}
                    placeholder="00:00:00:00:00:00:00"
                  />
                </>
              )}
            </>)}
          </ModalBody>
          <ModalFooter>
            <Flex gap={4} flexWrap={"wrap"}>
              {denied ? <Button onClick={handleDenialNote}>Submit Reason</Button> : null}
              {newCard ? <Button onClick={handleNewCard}>Submit</Button> : null}
              {checkComplete || denied ? null : (
                <>
                  <Button bg={"green.400"} onClick={handleConfirmation}>Confirmed</Button>
                  <Button bg={"red.400"} onClick={handleDenial}>Denied</Button>
                </>
              )}
              <Button onClick={() => setNewCard(true)}>New Card</Button>
              <Button onClick={handleCloseModal}>Close</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MemberModal
