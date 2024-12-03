package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seance")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;

    @Autowired
    private ProfesseurRepository professeurRepository; // Make sure you have this repository
    @Autowired
    private ClasseRepository classeRepository; // Make sure you have this repository

    @GetMapping
    public List<Seance> getAllSeance() {
        return seanceService.getAllSeance();
    }

    @GetMapping("/day/{jour}")
    public List<Seance> getSeancesByDay(@PathVariable String jour) {
        return seanceService.getSeancesByDay(jour);
    }

    @GetMapping("/{id}")
    public Seance getSeanceById(@PathVariable Long id) {
        return seanceService.getSeanceById(id);
    }

    @PostMapping
    public Seance createSeance(@RequestBody Seance seance) {
        // Fetch Professeur and Classe by their IDs
        Professeur professeur = professeurRepository.findById(seance.getProfesseur().getId())
                .orElseThrow(() -> new RuntimeException("Professeur not found"));
        Classe classe = classeRepository.findById(seance.getClasse().getId())
                .orElseThrow(() -> new RuntimeException("Classe not found"));

        // Set Professeur and Classe to Seance
        seance.setProfesseur(professeur);
        seance.setClasse(classe);

        // Save and return the Seance
        return seanceService.saveSeance(seance);
    }

    @DeleteMapping("/{id}")
    public void deleteSeance(@PathVariable Long id) {
        seanceService.deleteSeance(id);
    }
}
