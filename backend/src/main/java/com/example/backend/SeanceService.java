package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeanceService {

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;
    @Autowired
    private ClasseRepository classeRepository;

    public List<Seance> getAllSeance() {
        return seanceRepository.findAll();
    }

    public List<Seance> getSeancesByDay(String jour) {
        return seanceRepository.findByJour(jour);
    }

    public Seance getSeanceById(Long id) {
        return seanceRepository.findById(id).orElse(null);
    }

    public Seance saveSeance(Seance seance) {
        return seanceRepository.save(seance);
    }

    // New updateSeance method
    public Seance updateSeance(Long id, Seance seance) {
        Seance existingSeance = seanceRepository.findById(id).orElse(null);

        if (existingSeance != null) {
            // Update existing seance with new values
            existingSeance.setJour(seance.getJour());
            existingSeance.setDateHeureDebut(seance.getDateHeureDebut());
            existingSeance.setDateHeureFin(seance.getDateHeureFin());
            existingSeance.setMatiere(seance.getMatiere());

            // Fetch Professeur and Classe by IDs and update
            Professeur professeur = professeurRepository.findById(seance.getProfesseur().getId())
                    .orElseThrow(() -> new RuntimeException("Professeur not found"));
            Classe classe = classeRepository.findById(seance.getClasse().getId())
                    .orElseThrow(() -> new RuntimeException("Classe not found"));

            existingSeance.setProfesseur(professeur);
            existingSeance.setClasse(classe);

            return seanceRepository.save(existingSeance); // Save and return updated seance
        } else {
            throw new RuntimeException("Seance not found");
        }
    }

    public void deleteSeance(Long id) {
        seanceRepository.deleteById(id);
    }
}
