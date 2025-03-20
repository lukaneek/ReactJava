package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "person")
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message = "Enter Your First Name")
	@Size(min = 3, max = 30, message = "First Name must be between 3 and 30 characters")
	private String firstName;
	
	@NotEmpty(message = "Enter Your Last Name")
	@Size(min = 3, max = 30, message = "Last Name must be between 3 and 30 characters")
	private String lastName;
	
	@NotNull(message = "Please Enter you age.")
	@Min(value = 1, message = "Age must be greater than 0.")
	private Integer age;
	
	@NotEmpty(message = "Enter Your Address")
	private String address1;
	
	private String address2;
	
	@NotEmpty(message = "Enter Your City")
	private String city;
	
	@NotEmpty(message = "Enter Your State")
	private String state;
	
	@NotEmpty(message = "Enter Your Zip Code")
	private String zipCode;
	
	public Person() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	

}
