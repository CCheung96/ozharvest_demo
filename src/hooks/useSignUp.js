import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useCreateVisit from './useCreateVisit';
import useUploadPhoto from './useUploadPhoto';

const useSignUp = () => {
  const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const createVisit = useCreateVisit();
  const { uploadPhoto, isUpdating } = useUploadPhoto();
  const showToast = useShowToast();

  async function firstVisit(memberId) {
    createVisit(memberId);
  }

  async function signup(inputs, selectedFile) {
    if (!inputs.firstName || !inputs.surname || !inputs.birthDate ||
      !inputs.postcode || !inputs.language || !inputs.nationality ||
      !inputs.maritalStatus) {
      showToast("Incomplete Form", "Please fill in all mandatory fields", "error");
      return;
    }

    try {
      // Separate birthDate into birthDay and birthYear
      const dateInput = inputs.birthDate;
      const dob = dateInput.split("-"); // Split the string by "-"
      const birthDay = `${dob[1]}-${dob[2]}`; // Concatenate the month and day parts fo DOB
      // Determine birthYear based on includeYear boolean
      let birthYear = null
      if (inputs.includeYear) {
        birthYear = dob[0]
      }

      // Create and add the member document
      const memberDoc = {
        firstName: inputs.firstName.toLowerCase(),
        surname: inputs.surname.toLowerCase(),
        birthDay: birthDay,
        birthYear: birthYear,
        postcode: inputs.postcode,
        language: inputs.language.toLowerCase(),
        nationality: inputs.nationality.toLowerCase(),
        maritalStatus: inputs.maritalStatus.toLowerCase(),
        emailAddress: inputs.emailAddress.toLowerCase(),
        mobilePhoneNumber: inputs.mobilePhoneNumber,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(firestore, "members"), memberDoc);
      // Show success toast when member is added successfully
      showToast("Membership Created", "Member added successfully", "success");
      // Upload photo to DB 
      if (inputs.photoInDb) {
        try {
          await uploadPhoto(docRef, selectedFile, memberDoc)
          // await uploadPhoto(docRef, selectedFile)
        } catch (error) {
          showToast("Error Uploading Photo", error.message, "error")
        }
      }

      // Create a visit record for the new member
      firstVisit(docRef.id)

    } catch (error) {
      showToast("Error Creating Membership", error.message, "error");
    }
  }

  return { loading, error, signup }
}
export default useSignUp;