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
    professeurId: '',  // Use professeurId instead of professeur
    classeId: '',  // Use classeId instead of classe
  });

  const [isUpdating, setIsUpdating] = useState(false); // To track if we are updating a seance
  const [updateSeanceId, setUpdateSeanceId] = useState(null); // Store the id of the seance being updated

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes')
      .then(response => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching classes');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/seance')
      .then(response => {
        setSeances(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching sessions');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/professeur')
      .then(response => {
        setProfesseurs(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching professors');
        setLoading(false);
      });
  }, []);

  const handleCreateSeance = (e) => {
    e.preventDefault();

    const seanceToCreate = {
      jour: newSeance.jour,
      dateHeureDebut: newSeance.dateHeureDebut,
      dateHeureFin: newSeance.dateHeureFin,
      matiere: newSeance.matiere,
      professeur: { id: newSeance.professeurId },
      classe: { id: newSeance.classeId },
    };

    axios.post('http://localhost:8080/seance', seanceToCreate)
      .then(response => {
        setSeances([...seances, response.data]);
        alert('Session created');
        resetForm();
      })
      .catch((error) => {
        console.error('Error creating session:', error);
        setError('Error creating session');
      });
  };

  const handleUpdateSeance = (e) => {
    e.preventDefault();

    const updatedSeance = {
      id: updateSeanceId,  // Add the id to the update payload
      jour: newSeance.jour,
      dateHeureDebut: newSeance.dateHeureDebut,
      dateHeureFin: newSeance.dateHeureFin,
      matiere: newSeance.matiere,
      professeur: { id: newSeance.professeurId },
      classe: { id: newSeance.classeId },
    };

    axios.put(`http://localhost:8080/seance/${updateSeanceId}`, updatedSeance)
      .then(response => {
        setSeances(seances.map((seance) =>
          seance.id === updateSeanceId ? response.data : seance
        ));
        alert('Session updated');
        resetForm();
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error('Error updating session:', error);
        setError('Error updating session');
      });
  };

  const handleDeleteSeance = (id) => {
    axios.delete(`http://localhost:8080/seance/${id}`)
      .then(() => {
        setSeances(seances.filter((seance) => seance.id !== id));
        alert('Session deleted');
      })
      .catch((error) => {
        console.error('Error deleting session:', error);
        setError('Error deleting session');
      });
  };

  const resetForm = () => {
    setNewSeance({
      jour: '',
      dateHeureDebut: '',
      dateHeureFin: '',
      matiere: '',
      professeurId: '',
      classeId: '',
    });
  };

  const handleEditSeance = (seance) => {
    setNewSeance({
      jour: seance.jour,
      dateHeureDebut: seance.dateHeureDebut,
      dateHeureFin: seance.dateHeureFin,
      matiere: seance.matiere,
      professeurId: seance.professeur?.id || '',
      classeId: seance.classe?.id || '',
    });
    setUpdateSeanceId(seance.id);
    setIsUpdating(true);
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

      {/* Create or Update Form */}
      <h3>{isUpdating ? 'Update Seance' : 'Create New Seance'}</h3>
      <form onSubmit={isUpdating ? handleUpdateSeance : handleCreateSeance}>
        <select
          value={newSeance.jour}
          onChange={(e) => setNewSeance({ ...newSeance, jour: e.target.value })}
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

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

        <select
          value={newSeance.professeurId}
          onChange={(e) => setNewSeance({ ...newSeance, professeurId: e.target.value })}
        >
          {professeurs.map((professeur) => (
            <option key={professeur.id} value={professeur.id}>
              {professeur.nom} - {professeur.specialite} - {professeur.email}
            </option>
          ))}
        </select>

        <select
          value={newSeance.classeId}
          onChange={(e) => setNewSeance({ ...newSeance, classeId: e.target.value })}
        >
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.nom} - {classe.description}
            </option>
          ))}
        </select>

        <button type="submit">{isUpdating ? 'Update Seance' : 'Create Seance'}</button>
      </form>

      {/* Display Seances */}
      <h3>Seances</h3>
      <ul>
        {seances.map((seance) => (
          <li key={seance.id}>
            {seance.matiere} - {seance.jour} - {seance.professeur?.nom || 'N/A'} - {seance.classe?.nom || 'N/A'}
            <button onClick={() => handleEditSeance(seance)}>Edit</button>
            <button onClick={() => handleDeleteSeance(seance.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudOperationsPage;
