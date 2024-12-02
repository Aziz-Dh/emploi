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


@RestController
@RequestMapping("/etudiant")
public class EtudiantController {
	
	@Autowired
    private EtudiantService etudiantService;
	
	 @GetMapping
	    public List<Etudiant> getAllEtudiant() {
	        return etudiantService.getAllEtudiant();
	    }
	 
	 @GetMapping("/{id}")
	    public Etudiant getEtudiantById(@PathVariable Long id) {
	        return etudiantService.getEtudiantById(id);
	    }
	 
	 @PostMapping
	    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
	        return etudiantService.saveEtudiant(etudiant);
	    }
	  @DeleteMapping("/{id}")
	    public void deleteEtudiant(@PathVariable Long id) {
	        etudiantService.deleteEtudiant(id);
	    }
	 
	 
}
