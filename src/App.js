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

	useEffect(() => {
		refreshContacts();
	}, []);

	const onSubmitAddHandler = (contact) => {
		postContact(contact).then((data) => {
			refreshContacts();
		});
		setAddBtn(false);
	};

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

	const editBtnHandler = (id) => {
		setEditBtn(true);
		setIdToEdit(id);
		getContactById(id).then(({ data }) => {
			setContactForEdit((prevContact) => {
				return { ...prevContact, ...data };
			});
		});
	};

	const deleteContact = (id) => {
		// setContacts((prevContacts) => {
		// 	return prevContacts.filter((contact) => contact.id !== id);
		// });
		deleteContactById(id).then((data) => {
			refreshContacts();
		});

		setConfirmationDeleteMsg(false);
	};

	const deleteBtnHandler = (id) => {
		setConfirmationDeleteMsg(true);
		setIdToDelete(id);
	};

	const addContactBtnHandler = () => {
		setAddBtn(true);
	};

	return (
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
