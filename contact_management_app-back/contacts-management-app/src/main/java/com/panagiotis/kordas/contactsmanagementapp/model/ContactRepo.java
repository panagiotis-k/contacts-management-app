package com.panagiotis.kordas.contactsmanagementapp.model;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository<Contact,Long> {

	@Query(value="SELECT * FROM contacts",nativeQuery = true)
	List<Contact> findAll();
	
	@Query(value="SELECT * FROM contacts WHERE id=?1",nativeQuery = true)
	Contact getResourceById(long id);
	
	@Modifying
	@Transactional
	@Query(value="INSERT INTO contacts(first_name,last_name,email,address,phone_number) "
			+ "VALUES(?1,?2,?3,?4,?5)",nativeQuery = true)
	void postResource(String firstName,String lastName,String email,String addres,String phoneNumber);
	
	@Modifying
	@Transactional
	@Query(value="UPDATE contacts SET  first_name=?2,"
			+ "last_name=?3,email=?4,address=?5,phone_number=?6 WHERE id=?1",nativeQuery = true)
	void updateResource(long id,String firstName,String lastName,
			String email,String address,String phoneNumber);
	
	@Modifying
	@Transactional
	@Query(value="DELETE FROM contacts WHERE id=?1 ",nativeQuery = true)
	void deleteResourceById(long id);
	
	
}




