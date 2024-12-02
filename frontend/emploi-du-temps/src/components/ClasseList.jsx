import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassesList = () => {
  // State to hold the list of classes
  const [classes, setClasses] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [seances, setSeances] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  // State to handle errors
  const [error, setError] = useState('');

  // Fetch data from the Spring Boot API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/classes')  // Your API endpoint
      .then(response => {
        console.log(response.data);  // Log the response to check the structure
        setClasses(response.data);  // Store the fetched data
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setError('Error fetching data');
        setLoading(false);  
      });
  }, []);  


  useEffect(() => {
    axios.get('http://localhost:8080/professeur')  // Your API endpoint
      .then(response => {
        console.log(response.data);  // Log the response to check the structure
        setProfesseurs(response.data);  // Store the fetched data
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setError('Error fetching data');
        setLoading(false);  
      });
  }, []);  


  useEffect(() => {
    axios.get('http://localhost:8080/seance')  // Your API endpoint
      .then(response => {
        console.log(response.data);  
        setSeances(response.data);  
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setError('Error fetching data');
        setLoading(false);  
      });
  }, []);  

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <table border ='1'>
        <tr>
          <th>jour</th>
          <th>heure debut</th>
          <th>heure fin</th>
          <th>matiere</th>
          <th> professeur</th>
          <th>salle</th>
        </tr>
        <tr>
          <tr>
          <td>lundi </td>
          
          </tr>
         
          
          
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>


         
        </tr>
        <tr>
            <td>mardi</td>
            <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>
            
            </tr>
          <tr>
            <td>mercredi</td>
            <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>
          </tr>
          <tr>
            <td>jeudi</td>
             <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>
          </tr>
          <tr><td>
            vendredi</td>
            <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>
            
            </tr>
          <tr>
            <td>samedi</td>
            <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureDebut}
            </div>
               ))}</td>
          <td>{seances.map((seance,index) => (
            <div key={index }>
                      {seance.dateHeureFin}
            </div>
               ))}</td>
            
         
          
            
          <td>
          {seances.map((seance,index) => (
            <div key={index }>
                      {seance.matiere}
            </div>
               ))}
          </td>
          <td>
          {professeurs.map((professeur,index) => (
            <div key={index }>
                      {professeur.nom} - {professeur.specialite} - {professeur.email}
            </div>
               ))}
          </td>
          <td>
          {classes.map((classe) => (
          <li key={classe.id}> 
            {classe.description} - {classe.nom}  
          </li>
        ))}
          </td>
            </tr>
       
        </table>
     
      
    </div>
  );
};

export default ClassesList;
