package com.panagiotis.kordas.contactsmanagementapp.controllers;

import java.net.URI;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.panagiotis.kordas.contactsmanagementapp.model.Contact;
import com.panagiotis.kordas.contactsmanagementapp.model.ContactRepo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ContactResource {
	
	@Autowired
	private ContactRepo contactRepo;
	
	@GetMapping("/contacts")
	public List<Contact> getContacts(){
		return contactRepo.findAll();
	}
	
	@GetMapping("/contacts/{id}")
	public Contact getContactById(@PathVariable long id) {
		Contact contact = contactRepo.getResourceById(id);
		if (contact==null) {
			return null;
		}
		return contact;
	}
	

	@PostMapping("/contacts")
	public ResponseEntity<Contact> postContact(@RequestBody Contact contact){ 
		contactRepo.postResource(contact.getFirstName(),contact.getLastName(),
				contact.getEmail(),contact.getAddress(),contact.getPhoneNumber());
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(contact.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/contacts/{id}")
	public ResponseEntity<Contact> updateTodo(
			@PathVariable long id,@RequestBody Contact contact) {
		contactRepo.updateResource(id,contact.getFirstName(),contact.getLastName(),
				contact.getEmail(),contact.getAddress(),contact.getPhoneNumber());
		
		return  new ResponseEntity<Contact>(contact,HttpStatus.OK);
	}
	
	@DeleteMapping("/contacts/{id}")
	public ResponseEntity<Void> deleteToDo(@PathVariable long id) {
		Contact contact = contactRepo.getResourceById(id);
		if(contact != null) {
			contactRepo.deleteResourceById(id);
			return ResponseEntity.noContent().build();
		}else {
			return ResponseEntity.notFound().build(); 
		}
	}
}
