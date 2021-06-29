import React, { useState, useEffect } from 'react';
import ContactList from './components/contacts/ContactList';
import { ContactsContext } from './context/ContactsContext';
import './Bootstrap.css';
import styles from './App.module.css';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import DeleteModal from './UI/DeleteModal';
import { getContacts, postContact, deleteContactById, getContactById, editContactById } from './api/FetchData';

function App() {
	const [ contacts, setContacts ] = useState([]);
	const [ addBtnIsClicked, setAddBtn ] = useState(false);
	const [ editBtnIsClicked, setEditBtn ] = useState(false);
	const [ confirmantionDeleteMsg, setConfirmationDeleteMsg ] = useState(false);
	const [ idToDelete, setIdToDelete ] = useState(0);
	const [ idToEdit, setIdToEdit ] = useState(0);
	const [ contactForEdit, setContactForEdit ] = useState({ id: 0 });

	const refreshContacts = () => {
		getContacts().then(({ data }) => {
			setContacts(data);
		});
	};

	//Calling API
	//(requesting the endpoint '/contacts' to return the list of contacts that are saved on my DB)
	//during the Component first mounting
	useEffect(() => {
		refreshContacts();
	}, []);

	//listens to the 'add' button  click inside the AddContact Component when the form is submitted
	//a RQ is being sent to the backend API
	const onSubmitAddHandler = (contact) => {
		postContact(contact).then((data) => {
			refreshContacts();
		});
		setAddBtn(false);
	};

	//listens to the 'save' button click inside the EditContact Component when the form is submitted
	//a RQ is being sent to the backend API
	const onSubmitEditHandler = (id, contact) => {
		setEditBtn(false);
		editContactById(id, contact)
			.then(({ data }) => {
				refreshContacts();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//When the button for editing the already existing contact inside ContactList Component
	//(the orange one with the edit user icon from FontAwesome library
	//This functions gets thes id of the specific contact user wants to Edit
	//and a RQ is being sent to my backend API endpoint for getting the contact's data
	//in order to use this contact's info(I  save it to a local state variable) into
	//the EditContact Component(All fields are prefilled with the above info when this EdicComponent renders)
	const editBtnHandler = (id) => {
		setEditBtn(true);
		setIdToEdit(id);
		getContactById(id).then(({ data }) => {
			setContactForEdit((prevContact) => {
				return { ...prevContact, ...data };
			});
		});
	};

	//When YES button is clicked inside DeleteModal this functions is called
	//Then a RQ is being sent the backend API for deleting this contact with this specific id
	//and refresing again the list to render the remaining contacts 'on the fly'
	const deleteContact = (id) => {
		// setContacts((prevContacts) => {
		// 	return prevContacts.filter((contact) => contact.id !== id);
		// });
		deleteContactById(id).then((data) => {
			refreshContacts();
		});

		setConfirmationDeleteMsg(false);
	};

	//It listens the click event of the delete icon inside the ContactList Component
	//(the red one with the trash bin icon from FontAwesome lib )
	//It sets a flag to true in order to render the DeleteModal
	//Furthemore it receives the id of the specific contact which user wants to delete
	//in order to pass it (via ContextAPI) to the DeleteModal where it can be used to permanently delete the contact
	//if the YES button is clicked via permanentDelete() function
	const deleteBtnHandler = (id) => {
		setConfirmationDeleteMsg(true);
		setIdToDelete(id);
	};

	//When the button for adding a new contact(blue one with the plus user icon from FontAwesome)
	//is clicked in order to render the AddContact Component
	const addContactBtnHandler = () => {
		setAddBtn(true);
	};

	return (
		//I provide the Context API to all descendants(children elements and children of these clildren elements, etc.)
		//It's a better,more convenient and safer way to pass values and functions ,than props.
		<ContactsContext.Provider
			value={{
				contacts: contacts,
				setContacts: setContacts,
				onSubmitAddHandler: onSubmitAddHandler,
				onSubmitEditHandler: onSubmitEditHandler,
				setAddBtn: setAddBtn,
				setEditBtn: setEditBtn,
				deleteContact: deleteContact,
				setConfirmationDeleteMsg: setConfirmationDeleteMsg,
				deleteBtnHandler: deleteBtnHandler,
				idToEdit: idToEdit,
				idToDelete: idToDelete,
				editBtnHandler: editBtnHandler,
			}}
		>
			<div className={styles.app}>
				{confirmantionDeleteMsg && <DeleteModal />}
				{addBtnIsClicked && <AddContact />}
				{editBtnIsClicked && (
					<EditContact contactForEdit={contactForEdit} setContactForEdit={setContactForEdit} />
				)}
				<ContactList contacts={contacts} addContactBtnHandler={addContactBtnHandler} />
			</div>
		</ContactsContext.Provider>
	);
}

export default App;
