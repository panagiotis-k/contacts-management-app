import React from 'react';
import Button from './Button';
import styles from './ControlPanel.module.css';

const ControlPanel = ({ addContactHandler }) => {
	return (
		<Button className={styles.button} onClick={addContactHandler}>
			<i className="fas fa-user-plus" />
		</Button>
	);
};

export default ControlPanel;
