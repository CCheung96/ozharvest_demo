# Ozharvest Firebase Integrated Website

This is is an example of a website for Ozharvest with the incorporation of Firebase.
This was originally intended the functionality of firebase with Ozharvest's membership system. This was designed, keeping in mind that the final product is to be used by Ozharvest staff members to sign up new customers (aka. members) into the system and search up existing customers to allow or deny them access.

Because this is a "Membership" system, in this document, the market's "customers", which is the preferred term used by Ozharvest staff, will be referred to as "**members**". To avoid confusion, the staff members will always be referred to as "**staff**". This is how they are referred to within the code as well.

## Navigation
There are currently two important pages in this project: The Signup Page and the Search Page. Both can be accessed through buttons placed in the main page or by directly typing in their pathnames, /signup and /search respectively.

### Signup Page
This page shows a signup form that would contain the input fields Ozharvest would desire on their membership forms. Only the marked mandatory fields need to be filled in order the submit a form. Once those are filled and the button is clicked, the form will automatcally be converted to a "members" data document in firebase with a newly assigned id. Currently there's nothing preventing people from signing up multiple times
### Search Page
This is where customers can be searched up based on a selection of criteria. In the future the option to add as many search criteria will be available. For now, only one criterion can be used. The search will pull up a list of brief customer profiles. Clicking on one of them will pull up a modal containing all the customer's details and further actions that can be taken.
#### Member Modal
The Member Modal contains the rest of a member's details along buttons:
- Confirm: Press this button after confirming the customer's identity to check them into the store. If the member had not visited within the same week, their visit will be recorded in firebase and the staff can let them in. If the member had visited, a message will appear indicating that the member is a repeat visitor and a note will automatically be recorded in firebase.
- Deny: Press this button if the person asking for admittance claims to be this member but their details do not match up. Pressing this button allow the staff to write the reason for denying this person. (You cannot submit a note yet)
- Add Card: Press this to assign a new card to the customer using the card's ID. Currently, you can add as many card as you wish but the older cards are not deleted or deactivated.
- Close: This is to close the Modal. Closing and reopening the Modal will refresh the settings. 

## What has not been implemented yet
- a decent-looking homepage
- staff authorisation (atm the app is open to anyone)
- nfc scanning capabilities
