package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Classe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
    private String description;
    
    //getters and setters
    
    public Long getId() {
    	return this.id;
    }
    
    public void setId(Long Id) {
    	this.id=Id;
    }
    
    public String getNom() {
    	return this.nom;
    }
   
    public void setNom(String Nom) {
    	this.nom=Nom;
    }
    
    
    
    public String getDescription() {
    	return this.description;
    }
    
    public void setDescription(String Description) {
    	this.description=Description;
    }
	
}
