package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeanceService {
	  @Autowired
	  private SeanceRepository seanceRepository;
	  
	  
	  //get all Seance
	  public List<Seance> getAllSeance() {
	        return seanceRepository.findAll();
	    }
	  
	//get classe  by id
	   public Seance getSeanceById(Long id) {
	        return seanceRepository.findById(id).orElse(null);
	    }
	  
	   //submit
	   public Seance saveSeance(Seance seance) {
	        return seanceRepository.save(seance);
	    }
	  
	   //delete
	   public void deleteSeance(Long id) {
		   seanceRepository.deleteById(id);
	    }
	  
	  
	  
	  
	  
	  
	  
	  
}
