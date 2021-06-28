import React, { useState, useContext } from 'react';
import styles from './AddContact.module.css';
import Button from '../../UI/Button';
import { ContactsContext } from '../../context/ContactsContext';
import Card from '../../UI/Card';
import ContactModal from '../../UI/ContactModal';

//I have  already predefined 2 contacts(Records) in mysql db which are rendered when the App Component
//mounts.ID '3' will be assigned to the first contact that will be added in this form
let count = 2;

const AddContact = (props) => {
	const { onSubmitAddHandler, setAddBtn } = useContext(ContactsContext);
	const [ enteredFirstname, setFirstname ] = useState('');
	const [ enteredLastname, setLastname ] = useState('');
	const [ enteredEmail, setEmail ] = useState('');
	const [ enteredAddress, setAddress ] = useState('');
	const [ enteredPhone, setPhone ] = useState('');

	//Flags for the form validation
	const [ enteredFirstNameIsValid, setEnteredFirstNameIsValid ] = useState(false);
	const [ enteredFirstNameTouched, setEnteredFirstNameTouched ] = useState(false);

	const [ enteredLastNameIsValid, setEnteredLastNameIsValid ] = useState(false);
	const [ enteredLastNameTouched, setEnteredLastNameTouched ] = useState(false);

	const [ enteredEmailIsValid, setEnteredEmailIsValid ] = useState(false);
	const [ enteredEmailTouched, setEnteredEmailTouched ] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();

		//When the form is submitted all inputs are treated as 'touched' even if
		//the user did not type into them - he confirms the overall form
		setEnteredFirstNameTouched(true);
		setEnteredLastNameTouched(true);
		setEnteredEmailTouched(true);

		//I might as well could use  libraries such as Formik or Yup but i prefer to show the plain logic
		//with an if/else scale
		if (enteredFirstname.trim() === '') {
			if (enteredLastname.trim() === '') {
				if (!validateEmail(enteredEmail)) {
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
			} else if (!validateEmail(enteredEmail)) {
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
		} else if (enteredLastname.trim() === '') {
			if (!validateEmail(enteredEmail)) {
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
		} else if (!validateEmail(enteredEmail)) {
			setEnteredFirstNameIsValid(true);
			setEnteredLastNameIsValid(true);
			setEnteredEmailIsValid(false);
			return;
		}

		setEnteredFirstNameIsValid(true);
		setEnteredLastNameIsValid(true);

		const addedContact = {
			id: count + 1,
			firstName: enteredFirstname,
			lastName: enteredLastname,
			email: enteredEmail,
			address: enteredAddress,
			phoneNumber: enteredPhone,
		};

		//Sending the new contact to the App component
		onSubmitAddHandler(addedContact);

		//Clear the forms after submit
		setFirstname('');
		setLastname('');
		setEmail('');
		setPhone('');
		setAddress('');
	};

	//When user types, any previous warnings (red border & background) in the inputs disappear
	const firstnameHandler = (event) => {
		setEnteredFirstNameIsValid(true);
		setFirstname(event.target.value);
	};

	const lastnameHandler = (event) => {
		setEnteredLastNameIsValid(true);
		setLastname(event.target.value);
	};

	const emailHandler = (event) => {
		setEnteredEmailIsValid(true);
		setEmail(event.target.value);
	};

	const phoneHandler = (event) => {
		setPhone(event.target.value);
	};

	const addressHandler = (event) => {
		setAddress(event.target.value);
	};

	// - Email must contain the '@'(at sign) and the '.'(dot sign)
	// - There must be at least one character before and after the @.
	// - There must be at least two characters after the '.'(dot sign)
	function validateEmail(email) {
		let atPosition = email.indexOf('@');
		let dotPosition = email.lastIndexOf('.');
		if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length) {
			return false;
		}
		return true;
	}

	//Implementing some logic for the warning prompts when the user types an invalid email
	//or tries to omit first and last name fields
	const firstNameInputeIsInvalid = !enteredFirstNameIsValid && enteredFirstNameTouched;
	const firstNameInputClasses = firstNameInputeIsInvalid ? 'invalid' : '';

	const lastNameInputIsInvalid = !enteredLastNameIsValid && enteredLastNameTouched;
	const lastNameInputClasses = lastNameInputIsInvalid ? 'invalid' : '';

	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
	const emailInputClasses = emailInputIsInvalid ? 'invalid' : '';

	return (
		<ContactModal>
			<Card className={`${styles['form-control']}`}>
				<Button className={styles['cancel-btn']} type="button" onClick={() => setAddBtn(false)}>
					<i className="fas fa-window-close" />
				</Button>
				<form onSubmit={submitHandler}>
					<div className={styles['new-contact-header']}>New Contact</div>
					<div className={`${styles.inputField} ${styles[`${firstNameInputClasses}`]}`}>
						<label htmlFor="firstname">First-name:</label>
						<input id="firstname" type="text" onChange={firstnameHandler} value={enteredFirstname} />
					</div>
					{firstNameInputeIsInvalid && (
						<span style={{ color: 'rgb(144, 7, 7)' }}>First-name must not be empty</span>
					)}
					<div className={`${styles.inputField} ${styles[`${lastNameInputClasses}`]}`}>
						<label htmlFor="lastname">Last-name:</label>
						<input id="lastname" type="text" onChange={lastnameHandler} value={enteredLastname} />
					</div>
					{lastNameInputIsInvalid && (
						<span style={{ color: 'rgb(144, 7, 7)' }}>Last-name must not be empty</span>
					)}
					<div className={styles.inputField}>
						<label htmlFor="address">Address:</label>
						<input id="address" type="text" onChange={addressHandler} value={enteredAddress} />
					</div>
					<div className={`${styles.inputField} ${styles[`${emailInputClasses}`]}`}>
						<label htmlFor="email">Email:</label>
						<input id="email" type="email" onChange={emailHandler} value={enteredEmail} />
					</div>
					{emailInputIsInvalid && <span style={{ color: 'rgb(144, 7, 7)' }}>Ivalid email</span>}
					<div className={styles.inputField}>
						<label htmlFor="tel">Phone:</label>
						<input id="tel" type="text" onChange={phoneHandler} value={enteredPhone} />
					</div>
					<Button className={styles['submit-btn']} type="submit">
						Add
					</Button>
				</form>
			</Card>
		</ContactModal>
	);
};

export default AddContact;
