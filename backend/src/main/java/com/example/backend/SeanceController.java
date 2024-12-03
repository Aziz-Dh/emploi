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
    private ProfesseurRepository professeurRepository;
    @Autowired
    private ClasseRepository classeRepository;

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
        return seanceService.saveSeance(seance);
    }

    // Add PUT mapping for updating a Seance
    @PutMapping("/{id}")
    public Seance updateSeance(@PathVariable Long id, @RequestBody Seance seance) {
        return seanceService.updateSeance(id, seance);
    }

    @DeleteMapping("/{id}")
    public void deleteSeance(@PathVariable Long id) {
        seanceService.deleteSeance(id);
    }
}
