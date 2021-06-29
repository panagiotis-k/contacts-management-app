import axios from 'axios';

const API_URL = 'http://localhost:8080/contacts';

//cRud
export const getContacts = () => {
	return axios(API_URL);
};

//cRud
export const getContactById = (id) => {
	return axios(`${API_URL}/${id}`);
};

//Crud
export const postContact = (contact) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	};

	return axios.post(API_URL, contact, config);
};

//cruD
export const deleteContactById = (id) => {
	return axios.delete(`${API_URL}/${id}`);
};

//crUd
export const editContactById = (id, contact) => {
	return axios.put(`${API_URL}/${id}`, contact);
};
