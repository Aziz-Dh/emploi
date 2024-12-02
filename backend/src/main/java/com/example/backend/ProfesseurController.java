package com.example.backend;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/professeur")
public class ProfesseurController {
	@Autowired
    private ProfesseurService professeurService;
	


	 @GetMapping
	    public List<Professeur> getAllEtudiant() {
	        return professeurService.getAllProfesseur();
	    }
	 
	 
	 @GetMapping("/{id}")
	    public Professeur getProfesseurById(@PathVariable Long id) {
	        return professeurService.getProfesseurById(id);
	    }
	 
	 @PostMapping
	    public Professeur createProfesseur(@RequestBody Professeur professeur) {
	        return professeurService.saveProfesseur(professeur);
	    }
	 
	 @DeleteMapping("/{id}")
	    public void deleteProfesseur(@PathVariable Long id) {
		 professeurService.deleteProfesseur(id);
	    }


	public static void main(String[] args) {
		
		
	}
}
