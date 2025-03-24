package com.example.demo.controllers;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.example.demo.models.Person;
import com.example.demo.services.PersonService;
import com.example.demo.utils.Address;
import com.example.demo.utils.GoogleValidationInput;
import com.google.gson.Gson;

import jakarta.validation.Valid;

@CrossOrigin(origins = {"http://localhost:5173", "https://lukavujasin.xyz"})
@RestController
public class PersonController {

	@Autowired
	PersonService personServ;
	
	@Value("${app_google_apikey}")
	private String googleApiKey;

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
	
	@GetMapping("/persons")
	public ResponseEntity<List <Person>> getAll() {
		return new ResponseEntity<>(personServ.findAll(), HttpStatus.OK);
	}
	
	@PutMapping("/person")
	public  ResponseEntity<Person> updatePerson(@Valid @RequestBody Person person) {
		Person personFromDb = personServ.findPerson(person.getId());
		if (personFromDb != null) {
			return new ResponseEntity<>(personServ.updatePerson(person), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/person/{id}")
	public ResponseEntity<String> deletePerson(@PathVariable("id") Long id) {
		personServ.deletePerson(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<String> addressValidation(@RequestBody Address address) {
		GoogleValidationInput input = new GoogleValidationInput();
		input.setAddressLines(new String[] {address.getAddress1() + " " + address.getAddress2()});
		input.setLocality(address.getCity());
		input.setAdministrativeArea(address.getState());
		input.setPostalCode(address.getZipCode());
		
		String jsonInput = new Gson().toJson(input);
		jsonInput = "{\"address\":" + jsonInput + "}";
		
		HttpClient client = HttpClient.newBuilder().build();
		HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://addressvalidation.googleapis.com/v1:validateAddress?key=" + googleApiKey))
				.header("Content-Type", "application/json")
				.POST(HttpRequest.BodyPublishers.ofString(jsonInput))
				.build();
		
		HttpResponse<String> response = null;
		
		try {
			response = client.send(request, HttpResponse.BodyHandlers.ofString());
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return new ResponseEntity<>(response.body(), HttpStatus.OK); 
	}

}
