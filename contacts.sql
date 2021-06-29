CREATE TABLE contacts (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(100),
address VARCHAR(100),
phone_number VARCHAR(100)
);

INSERT INTO contacts(id,first_name,last_name,email,address,phone_number)
VALUES (1,'Panagiotis','Kordas','panagiotiskordas92@gmail.com','Metamorfoseos 3','6943411383'),
		(2,'Eleni','Chatzaki','eldinaxatz19@gmail.com','Metamorfoseos 3','6971503635');
        






  