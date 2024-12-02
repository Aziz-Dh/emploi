package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfesseurService {
	  
	 @Autowired
	  private ProfesseurRepository professeurRepository;
	 
	//get all professeur
	  public List<Professeur> getAllProfesseur() {
	        return professeurRepository.findAll();
	    }
	  
	  //get professeur  by id
	   public Professeur getProfesseurById(Long id) {
	        return professeurRepository.findById(id).orElse(null);
	    }
	   
	   //submit
	   public Professeur saveProfesseur(Professeur professeur) {
	        return professeurRepository.save(professeur);
	    }
	   
	   //delete
	   public void deleteProfesseur(Long id) {
		   professeurRepository.deleteById(id);
	    }
	   

}
