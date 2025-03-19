package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Person;
import com.example.demo.services.PersonService;

import jakarta.validation.Valid;

@RestController
public class PersonController {

	@Autowired
	PersonService personServ;

	@PostMapping("/person")
	public ResponseEntity<Long> createPerson(@Valid @RequestBody Person person) {
		return new ResponseEntity<>(personServ.createPerson(person), HttpStatus.CREATED);
	}

	@GetMapping("/person/{id}")
	public ResponseEntity<Person> findPerson(@PathVariable("id") Long id) {
		Person person = personServ.findPerson(id);
		if (person != null) {
			return new ResponseEntity<>(person, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
