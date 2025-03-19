package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Person;
import com.example.demo.repositories.PersonRepository;

@Service
public class PersonService {
	
	@Autowired
	private PersonRepository personRepo;
	
	public Person findPerson (Long id) {
		Optional<Person> person = personRepo.findById(id);
		if (person.isPresent()) {
			return person.get();
		}
		return null;
	}
	
	public Long createPerson(Person person) {
		Person savedPerson = personRepo.save(person);
		return savedPerson.getId();
	}

}
