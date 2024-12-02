package com.example.backend;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Etudiant {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String nom;
	
    private String email;
	
    @ManyToOne
    @JoinColumn(name = "classe_id")
    private Classe classe;
    
    
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

    // Getter pour l'email
    public String getEmail() {
        return email;
    }

    // Setter pour l'email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter pour la classe
    public Classe getClasse() {
        return classe;
    }

    // Setter pour la classe
    public void setClasse(Classe classe) {
        this.classe = classe;
    }
    
    
    
}
