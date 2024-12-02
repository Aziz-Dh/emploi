package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClasseService {
	  @Autowired
	  private ClasseRepository classeRepository;
	  
	  //get all classe
	  public List<Classe> getAllClasses() {
	        return classeRepository.findAll();
	    }
	  
	  //get classe  by id
	   public Classe getClasseById(Long id) {
	        return classeRepository.findById(id).orElse(null);
	    }
	  
	   //submit
	   public Classe saveClasse(Classe classe) {
	        return classeRepository.save(classe);
	    }
	   
	   //delete
	   public void deleteClasse(Long id) {
	        classeRepository.deleteById(id);
	    }
	  
	  
	  
	  
	  
}
