import React, { useContext, useState } from 'react';
import { ContactsContext } from '../../context/ContactsContext';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import styles from './EditContact.module.css';
import ContactModal from '../../UI/ContactModal';

const EditContact = (props) => {
	const { contactForEdit, setContactForEdit } = props;
	const { firstName, lastName, address, email, phoneNumber } = contactForEdit;

	const { setEditBtn, idToEdit } = useContext(ContactsContext);
	const { onSubmitEditHandler } = useContext(ContactsContext);

	const [ enteredFirstNameIsValid, setEnteredFirstNameIsValid ] = useState(false);
	const [ enteredFirstNameTouched, setEnteredFirstNameTouched ] = useState(false);

	const [ enteredLastNameIsValid, setEnteredLastNameIsValid ] = useState(false);
	const [ enteredLastNameTouched, setEnteredLastNameTouched ] = useState(false);

	const [ enteredEmailIsValid, setEnteredEmailIsValid ] = useState(false);
	const [ enteredEmailTouched, setEnteredEmailTouched ] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();

		setEnteredFirstNameTouched(true);
		setEnteredLastNameTouched(true);
		setEnteredEmailTouched(true);

		if (firstName.trim() === '') {
			if (lastName.trim() === '') {
				if (!validateEmail(email)) {
					setEnteredFirstNameIsValid(false);
					setEnteredLastNameIsValid(false);
					setEnteredEmailIsValid(false);
					return;
				} else {
					setEnteredEmailIsValid(true);
					setEnteredFirstNameIsValid(false);
					setEnteredLastNameIsValid(false);
					return;
				}
			} else if (!validateEmail(email)) {
				setEnteredFirstNameIsValid(false);
				setEnteredEmailIsValid(false);
				setEnteredLastNameIsValid(true);
				return;
			} else {
				setEnteredFirstNameIsValid(false);
				setEnteredEmailIsValid(true);
				setEnteredLastNameIsValid(true);
				return;
			}
		} else if (lastName.trim() === '') {
			if (!validateEmail(email)) {
				setEnteredFirstNameIsValid(true);
				setEnteredLastNameIsValid(false);
				setEnteredEmailIsValid(false);
				return;
			} else {
				setEnteredFirstNameIsValid(true);
				setEnteredLastNameIsValid(false);
				setEnteredEmailIsValid(true);
				return;
			}
		} else if (!validateEmail(email)) {
			setEnteredFirstNameIsValid(true);
			setEnteredLastNameIsValid(true);
			setEnteredEmailIsValid(false);
			return;
		}

		setEnteredFirstNameIsValid(true);
		setEnteredLastNameIsValid(true);
		setEnteredEmailIsValid(true);

		onSubmitEditHandler(idToEdit, contactForEdit);
	};

	const firstnameHandler = (event) => {
		setEnteredFirstNameIsValid(true);
		setContactForEdit((prevContact) => {
			return { ...prevContact, firstName: event.target.value };
		});
	};

	const lastnameHandler = (event) => {
		setEnteredLastNameIsValid(true);
		setContactForEdit((prevContact) => {
			return { ...prevContact, lastName: event.target.value };
		});
	};

	const addressHandler = (event) => {
		setEnteredEmailIsValid(true);
		setContactForEdit((prevContact) => {
			return { ...prevContact, address: event.target.value };
		});
	};

	const emailHandler = (event) => {
		setContactForEdit((prevContact) => {
			return { ...prevContact, email: event.target.value };
		});
	};

	const phoneHandler = (event) => {
		setContactForEdit((prevContact) => {
			return { ...prevContact, phoneNumber: event.target.value };
		});
	};

	function validateEmail(email) {
		let atPosition = email.indexOf('@');
		let dotPosition = email.lastIndexOf('.');
		if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length) {
			return false;
		}
		return true;
	}

	const firstNameInputeIsInvalid = !enteredFirstNameIsValid && enteredFirstNameTouched;
	const firstNameInputClasses = firstNameInputeIsInvalid ? 'invalid' : '';

	const lastNameInputIsInvalid = !enteredLastNameIsValid && enteredLastNameTouched;
	const lastNameInputClasses = lastNameInputIsInvalid ? 'invalid' : '';

	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
	const emailInputClasses = emailInputIsInvalid ? 'invalid' : '';

	return (
		<ContactModal>
			<Card className={`${styles['form-control']} `}>
				<Button className={styles['cancel-btn']} type="button" onClick={() => setEditBtn(false)}>
					<i className="fas fa-window-close" />
				</Button>
				<form onSubmit={submitHandler}>
					<div className={styles['new-contact-header']}>Edit Contact</div>
					<div className={`${styles.inputField} ${styles[`${firstNameInputClasses}`]}`}>
						<label htmlFor="firstName">First-name:</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							onChange={firstnameHandler}
							value={firstName || ''}
						/>
					</div>
					{firstNameInputeIsInvalid && (
						<span style={{ color: 'rgb(144, 7, 7)' }}>First-name must not be empty</span>
					)}
					<div className={`${styles.inputField} ${styles[`${lastNameInputClasses}`]}`}>
						<label htmlFor="lastName">Last-name:</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							onChange={lastnameHandler}
							value={lastName || ''}
						/>
					</div>
					{lastNameInputIsInvalid && (
						<span style={{ color: 'rgb(144, 7, 7)' }}>Last-name must not be empty</span>
					)}
					<div className={styles.inputField}>
						<label htmlFor="address">Address:</label>
						<input
							id="address"
							name="address"
							type="text"
							onChange={addressHandler}
							value={address || ''}
						/>
					</div>
					<div className={`${styles.inputField} ${styles[`${emailInputClasses}`]}`}>
						<label htmlFor="email">Email:</label>
						<input id="email" name="email" type="email" onChange={emailHandler} value={email || ''} />
					</div>
					{emailInputIsInvalid && <span style={{ color: 'rgb(144, 7, 7)' }}>Ivalid email</span>}
					<div className={styles.inputField}>
						<label htmlFor="tel">Phone:</label>
						<input
							id="tel"
							name="phoneNumber"
							type="text"
							onChange={phoneHandler}
							value={phoneNumber || ''}
						/>
					</div>
					<Button className={styles['submit-btn']} type="submit">
						Save
					</Button>
				</form>
			</Card>
		</ContactModal>
	);
};

export default EditContact;
