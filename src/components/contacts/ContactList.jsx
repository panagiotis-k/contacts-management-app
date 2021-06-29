import React, { useContext } from 'react';
import { ContactsContext } from '../../context/ContactsContext';
import Card from '../../UI/Card';
import styles from './ContactList.module.css';
import Button from '../../UI/Button';

const ContactList = (props) => {
	const { deleteBtnHandler, editBtnHandler } = useContext(ContactsContext);

	
	const deleteHandler = (id) => {
		deleteBtnHandler(id);
	};

	return (
		<Card style={{ overflowX: 'auto', overflowY: 'auto' }} className={styles['contactList']}>
			<Button className={styles.button} onClick={props.addContactBtnHandler}>
				<i className="fas fa-user-plus" />
			</Button>
			<hr />
			{props.contacts.length === 0 && <span>No records yet..</span>}
			{props.contacts.length > 0 && (
				<div style={{ overflowX: 'auto', overflowY: 'auto' }}>
					<table className="table ">
						<thead className={styles.table}>
							<tr>
								<th>First-name</th>
								<th>Last-name</th>
								<th>Email</th>
								<th>Address</th>
								<th>Phone Number</th>
								<th />
								<th />
							</tr>
						</thead>
						<tbody>
							{props.contacts.map((contact) => {
								return (
									<tr className={styles['table-row']} key={contact.id}>
										<td>{contact.firstName}</td>
										<td>{contact.lastName}</td>
										<td>{contact.email}</td>
										<td>{contact.address}</td>
										<td>{contact.phoneNumber}</td>
										<td>
											<button
												className={`btn btn-warning btn-sm ${styles['edit-btn']}`}
												onClick={() => {
													editBtnHandler(contact.id);
												}}
											>
												<i className="fas fa-user-edit" />
											</button>
										</td>
										<td>
											<button
												className={`btn btn-danger btn-sm ${styles['delete-btn']}`}
												onClick={() => deleteHandler(contact.id)}
											>
												<i className="fas fa-trash-alt" />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</Card>
	);
};

export default ContactList;
