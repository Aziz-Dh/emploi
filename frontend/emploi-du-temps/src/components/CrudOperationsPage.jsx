import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudOperationsPage = () => {
  const [seances, setSeances] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSeance, setNewSeance] = useState({
    jour: '',
    dateHeureDebut: '',
    dateHeureFin: '',
    matiere: '',
    professeurId: '',
    classeId: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes')  // Your API endpoint for classes
      .then(response => {
        setClasses(response.data);  // Store the fetched data
        setLoading(false);  
      })
      .catch(error => {
        setError('Error fetching classes');
        setLoading(false);  
      });
  }, []);  

  useEffect(() => {
    axios.get('http://localhost:8080/seance')  // Your API endpoint for seances
      .then(response => {
        setSeances(response.data);  // Store the fetched sessions
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching sessions');
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:8080/professeur')  // Your API endpoint for professors
      .then(response => {
        setProfesseurs(response.data);  // Store the fetched professors
        setLoading(false);  
      })
      .catch(error => {
        setError('Error fetching professors');
        setLoading(false);  
      });
  }, []);  


  // Function to handle create
  const handleCreateSeance = (e) => {
    e.preventDefault();

    // Ensure that professeurId and classeId are set in the newSeance state correctly
    axios.post('http://localhost:8080/seance', newSeance)
      .then(response => {
        setSeances([...seances, response.data]);  // Add the new session to the list
        alert('Session created');
      })
      .catch(error => {
        setError('Error creating session');
      });
  };
  

  // Function to handle update
  const handleUpdateSeance = (id) => {
    axios.put(`http://localhost:8080/seance/${id}`, newSeance)
      .then(response => {
        setSeances(seances.map(seance => seance.id === id ? response.data : seance));
        alert('Session updated');
      })
      .catch(error => {
        setError('Error updating session');
      });
  };

  // Function to handle delete
  const handleDeleteSeance = (id) => {
    axios.delete(`http://localhost:8080/seance/${id}`)
      .then(() => {
        setSeances(seances.filter(seance => seance.id !== id));
        alert('Session deleted');
      })
      .catch(error => {
        setError('Error deleting session');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>CRUD Operations</h1>

      {/* Create Form */}
      <h3>Create New Seance</h3>
      <form onSubmit={handleCreateSeance}>
        <input
          type="text"
          placeholder="Matière"
          value={newSeance.matiere}
          onChange={(e) => setNewSeance({ ...newSeance, matiere: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newSeance.dateHeureDebut}
          onChange={(e) => setNewSeance({ ...newSeance, dateHeureDebut: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newSeance.dateHeureFin}
          onChange={(e) => setNewSeance({ ...newSeance, dateHeureFin: e.target.value })}
        />

        {/* Professeur Select Dropdown */}
        <select
          value={newSeance.professeurId}
          onChange={(e) => setNewSeance({ ...newSeance, professeurId: e.target.value })}
        >
          <option value="">Select Professeur</option>
          {professeurs.map((professeur) => (
            <option key={professeur.id} value={professeur.id}>
              {professeur.nom} - {professeur.specialite} - {professeur.email}
            </option>
          ))}
        </select>

        {/* Classe Select Dropdown */}
        <select
          value={newSeance.classeId}
          onChange={(e) => setNewSeance({ ...newSeance, classeId: e.target.value })}
        >
          <option value="">Select Classe</option>
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.nom} - {classe.description}
            </option>
          ))}
        </select>

        <button type="submit">Create Seance</button>
      </form>

      <h3>Existing Seances</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Heure Début</th>
            <th>Heure Fin</th>
            <th>Matière</th>
            <th>Professeur</th>
            <th>Salle (Classe)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seances.map((seance) => {
            // Find the corresponding professeur and classe using the IDs
            const professeur = professeurs.find((prof) => prof.id === seance.professeurId);
            const classe = classes.find((cls) => cls.id === seance.classeId);

            return (
              <tr key={seance.id}>
                <td>{seance.jour}</td>
                <td>{seance.dateHeureDebut}</td>
                <td>{seance.dateHeureFin}</td>
                <td>{seance.matiere}</td>
                <td>{professeur ? `${professeur.nom} - ${professeur.specialite}` : 'N/A'}</td>
                <td>{classe ? `${classe.nom} - ${classe.description}` : 'N/A'}</td>
                <td>
                  <button onClick={() => handleUpdateSeance(seance.id)}>Update</button>
                  <button onClick={() => handleDeleteSeance(seance.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CrudOperationsPage;
