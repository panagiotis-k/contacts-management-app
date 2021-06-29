import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './ContactModal.module.css';
import { Backdrop } from './Backdrop';

//For more clean and concrete code I have created two portals for the Backdrop and the Modal Overlay
//These portals take place inside the index.html file just before the root element where my App is rendered.
//The same strategy is implemented for both ContactModal and DeleteModal.
const ContactModalOverlay = (props) => {
	return <div className={styles.modal}>{props.children}</div>;
};

//In some portions of my code I have replaced divs as root elements(of the rendering) with React Fragments
//just for cleaner code.
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
