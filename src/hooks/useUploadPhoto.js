import { useState } from 'react';
import { storage, firestore } from  '../firebase/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useUploadPhoto = () => {
  const [isUpdating, setIsUpdating] = useState(false)
  const showToast = useShowToast();

  const uploadPhoto = async (memberId, selectedFile, memberDoc) => {
    console.log("member's ID", memberId.id);
    console.log("Photo", selectedFile);
    console.log("MemberDoc", memberDoc);

    if(isUpdating){
      console.log("This is Uploading");
    } else {
      setIsUpdating(true)
    }

    const storageRef = ref(storage, `memberImg/${memberId.id}`)
    const memberDocRef = doc(firestore, "members", memberId.id)
    let URL = ""

    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url")
        URL = await getDownloadURL(storageRef)
        console.log("Here's Your URL!", URL);
      }

      const updatedMemberDoc = {
        ...memberDoc,
        photoURL: URL
      }

      await updateDoc(memberDocRef, updatedMemberDoc);
      showToast("Success", "Photo updated successfully", "success")
    } catch (error) {
      console.error("Error", error);
      showToast("Error Uploading Photo", error.message, "error")
    }
  }

  	return { uploadPhoto, isUpdating };
}

export default useUploadPhoto