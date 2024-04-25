import { firestore } from '../firebase/firebase';
import { query, collection, where, orderBy, limit, getDocs } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useCheckVisit = () => {
  const showToast = useShowToast();

  async function getLatestStoreVisitForMember(memberId) {
    try {
      // Query the visits collection for documents with the specified memberId
      const q = query(
        collection(firestore, 'visits'),
        where('memberId', '==', memberId),
        orderBy('visitedAt', 'desc'), // Order by timestamp in descending order
        limit(1) // Limit the result to only one document (the latest)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Initialize a variable to store the latest store visit
      let data = null;

      // Check if there are any results
      if (!querySnapshot.empty) {
        // Get the first document (the latest store visit)
        const doc = querySnapshot.docs[0];
        data = { id: doc.id, ...doc.data() };
      }

      // Return the latest store visit
      return data;
    } catch (error) {
      showToast("Error Fetching Last Visit", error, "error");
      return null; // Return null if an error occurs
    }
  }

  async function isLastVisitInCurrentWeek(memberId) {
    try {
      // Get the current day of the week from the current date 
      // (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();
      // Calculate the start date and end date of the current week 
      // (Sunday and Saturday)
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDayOfWeek);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      // Get the latest store visit for the member
      const latestVisit = await getLatestStoreVisitForMember(memberId);

      // Check if latest visit exists and has occurred within the current week
      if (latestVisit) {
        const timestamp = latestVisit.visitedAt;
        const storeVisitDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return storeVisitDate >= startDate && storeVisitDate <= endDate;
      } else {
        // If no visit exists, return false
        return false;
      }
    } catch (error) {
      showToast("Error Checking Last Visit", error, "error");
      return false;
    }
  }
  return isLastVisitInCurrentWeek
}

export default useCheckVisit