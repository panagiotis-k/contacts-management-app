import React, { useContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ContactsContext } from '../context/ContactsContext';
import styles from './DeleteModal.module.css';
import { Backdrop } from './Backdrop';

const DeleteModalOverlay = (props) => {
	const { deleteContact, setConfirmationDeleteMsg, idToDelete } = useContext(ContactsContext);
	const permanentDelete = () => {
		deleteContact(idToDelete);
	};

	
	const cancelDeletion = () => {
		setConfirmationDeleteMsg(false);
	};
	return (
		<div className={styles.modal}>
			<p>
				<i className={`fas fa-exclamation-triangle ${styles.warning}`} />Are you sure you want to delete this
				user?
			</p>
			<div className={styles.buttons}>
				<button className={styles['yes-btn']} onClick={permanentDelete}>
					Yes
				</button>
				<button className={styles['no-btn']} onClick={cancelDeletion}>
					No
				</button>
			</div>
		</div>
	);
};

const DeleteModal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(<DeleteModalOverlay />, document.getElementById('overlay-root'))}
		</Fragment>
	);
};

export default DeleteModal;
