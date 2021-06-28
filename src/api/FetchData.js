import axios from 'axios';

const API_URL = 'http://localhost:8080/contacts';

export const getContacts = () => {
	return axios(API_URL);
};

export const getContactById = (id) => {
	return axios(`${API_URL}/${id}`);
};

export const postContact = (contact) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	};

	return axios.post(API_URL, contact, config);
};

export const deleteContactById = (id) => {
	return axios.delete(`${API_URL}/${id}`);
};

export const editContactById = (id, contact) => {
	return axios.put(`${API_URL}/${id}`, contact);
};
