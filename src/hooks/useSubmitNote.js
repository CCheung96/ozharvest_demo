import { firestore } from "../firebase/firebase"
import useShowToast from "./useShowToast"
import { addDoc, collection } from "firebase/firestore";

const useSubmitNote = () => {
  const showToast = useShowToast();

  async function submitNote(memberId, noteType, noteText) {

    try {
      const noteDoc = {
        memberId: memberId,
        noteType: noteType,
        noteText: noteText,
        sumbittedAt: new Date()
      };

      await addDoc(collection(firestore, "notes"), noteDoc);
      showToast("Note Recorded", noteType + " note recorded successfully", "success");
    } catch (error) {
      showToast("Error Submitting Note", error.message, "error");
    }

  }



  return submitNote
}

export default useSubmitNote