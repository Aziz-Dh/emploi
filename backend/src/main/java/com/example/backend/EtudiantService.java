package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EtudiantService {
 
	  @Autowired
	  private EtudiantRepository etudiantRepository;
	  
	  //get all etudiant
	  public List<Etudiant> getAllEtudiant() {
	        return etudiantRepository.findAll();
	    }
	  
	  //get classe  by id
	   public Etudiant getEtudiantById(Long id) {
	        return etudiantRepository.findById(id).orElse(null);
	    }
	  
	   //submit
	   public Etudiant saveEtudiant(Etudiant etudiant) {
	        return etudiantRepository.save(etudiant);
	    }
	   
	   //delete
	   public void deleteEtudiant(Long id) {
	        etudiantRepository.deleteById(id);
	    }
}
