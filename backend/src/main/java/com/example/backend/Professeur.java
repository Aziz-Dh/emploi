package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Professeur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nom;
    private String specialite;
    private String email;
    
    
    //getters and setters
    // Getter pour l'identifiant
    public Long getId() {
        return id;
    }

    // Setter pour l'identifiant
    public void setId(Long id) {
        this.id = id;
    }

    // Getter pour le nom
    public String getNom() {
        return nom;
    }

    // Setter pour le nom
    public void setNom(String nom) {
        this.nom = nom;
    }

    // Getter pour la spécialité
    public String getSpecialite() {
        return specialite;
    }

    // Setter pour la spécialité
    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    // Getter pour l'email
    public String getEmail() {
        return email;
    }

    // Setter pour l'email
    public void setEmail(String email) {
        this.email = email;
    }
}
