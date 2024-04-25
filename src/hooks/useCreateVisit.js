import React from 'react'
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import { collection, addDoc } from 'firebase/firestore';

const useCreateVisit = () => {
  const showToast = useShowToast();
  async function createVisit(memberId) {
    try {
      // Create a new document with a generated ID
      const visitDoc = {
        memberId: memberId,
        visitedAt: new Date(), // Include timestamp of the visit
        // Other relevant fields
      };

      await addDoc(collection(firestore, "visits"), visitDoc);
      showToast("Visit Recorded", "Member visit recorded successfully", "success");
    } catch (error) {
      showToast("Error Recording Store Visit", error.message, "error");
    }
  }

  return createVisit
}

export default useCreateVisit