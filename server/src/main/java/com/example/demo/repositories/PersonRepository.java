package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long>{

}
