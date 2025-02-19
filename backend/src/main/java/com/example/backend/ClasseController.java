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
@RequestMapping("/api/classes")
public class ClasseController {

	@Autowired
    private ClasseService classeService;

    @GetMapping
    public List<Classe> getAllClasses() {
        return classeService.getAllClasses();
    }

    @GetMapping("/{id}")
    public Classe getClasseById(@PathVariable Long id) {
        return classeService.getClasseById(id);
    }

    @PostMapping
    public Classe createClasse(@RequestBody Classe classe) {
        return classeService.saveClasse(classe);
    }

    @DeleteMapping("/{id}")
    public void deleteClasse(@PathVariable Long id) {
        classeService.deleteClasse(id);
    }
	
}
