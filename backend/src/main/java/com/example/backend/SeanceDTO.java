package com.example.backend;

public class SeanceDTO {

    private String matiere;
    private String dateHeureDebut;
    private String dateHeureFin;
    private Long professeurId;
    private Long classeId;

    // Getters and Setters

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }

    public String getDateHeureDebut() {
        return dateHeureDebut;
    }

    public void setDateHeureDebut(String dateHeureDebut) {
        this.dateHeureDebut = dateHeureDebut;
    }

    public String getDateHeureFin() {
        return dateHeureFin;
    }

    public void setDateHeureFin(String dateHeureFin) {
        this.dateHeureFin = dateHeureFin;
    }

    public Long getProfesseurId() {
        return professeurId;
    }

    public void setProfesseurId(Long professeurId) {
        this.professeurId = professeurId;
    }

    public Long getClasseId() {
        return classeId;
    }

    public void setClasseId(Long classeId) {
        this.classeId = classeId;
    }
}
