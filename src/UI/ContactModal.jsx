import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './ContactModal.module.css';
import { Backdrop } from './Backdrop';

const ContactModalOverlay = (props) => {
	return <div className={styles.modal}>{props.children}</div>;
};

const ContactModal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(
				<ContactModalOverlay children={props.children} />,
				document.getElementById('overlay-root'),
			)}
		</Fragment>
	);
};

export default ContactModal;
