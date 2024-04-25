import React from 'react'
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast'
import { doc, setDoc } from 'firebase/firestore';

const useAssignCard = () => {
  const showToast = useShowToast();

  async function assignCard(memberId, cardId) {

    if (!memberId) {
      showToast("Cannot Assign Card", "No Member ID provided", "error")
      return;
    }
    if (!cardId) {
      showToast("Cannot Assign Card", "No Card ID provided", "error")
      return;
    }
    // TODO: make sure the memberId and cardId is of the correct format

    try {
      const cardDoc = {
        memberId: memberId,
        issueDate: new Date(),
        status: "active"
      }

      await setDoc(doc(firestore, "cards", cardId), cardDoc);
      // Successful Toast when card is added succesfully
      showToast("Card Assigned Successfully", "The new card is now ready to use", "success")
    } catch (error) {
      showToast("Error Assigning Card", error.message, "error")
    }
  }

  return assignCard
}

export default useAssignCard