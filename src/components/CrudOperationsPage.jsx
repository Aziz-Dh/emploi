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

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSeanceId, setUpdateSeanceId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes')
      .then(response => setClasses(response.data))
      .catch(() => setError('Error fetching classes'));
    axios.get('http://localhost:8080/seance')
      .then(response => setSeances(response.data))
      .catch(() => setError('Error fetching sessions'));
    axios.get('http://localhost:8080/professeur')
      .then(response => setProfesseurs(response.data))
      .catch(() => setError('Error fetching professors'));
    setLoading(false);
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
        resetForm();
      })
      .catch(() => setError('Error creating session'));
  };

  const handleUpdateSeance = (e) => {
    e.preventDefault();
    const updatedSeance = {
      id: updateSeanceId,
      jour: newSeance.jour,
      dateHeureDebut: newSeance.dateHeureDebut,
      dateHeureFin: newSeance.dateHeureFin,
      matiere: newSeance.matiere,
      professeur: { id: newSeance.professeurId },
      classe: { id: newSeance.classeId },
    };

    axios.put(`http://localhost:8080/seance/${updateSeanceId}`, updatedSeance)
      .then(response => {
        setSeances(seances.map((seance) => seance.id === updateSeanceId ? response.data : seance));
        resetForm();
        setIsUpdating(false);
      })
      .catch(() => setError('Error updating session'));
  };

  const handleDeleteSeance = (id) => {
    axios.delete(`http://localhost:8080/seance/${id}`)
      .then(() => {
        setSeances(seances.filter((seance) => seance.id !== id));
      })
      .catch(() => setError('Error deleting session'));
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">CRUD Operations</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl mb-4">{isUpdating ? 'Update Seance' : 'Create New Seance'}</h3>
        <form onSubmit={isUpdating ? handleUpdateSeance : handleCreateSeance} className="space-y-4">
          <div>
            <label htmlFor="jour" className="block text-sm font-medium">Day</label>
            <select
              id="jour"
              value={newSeance.jour}
              onChange={(e) => setNewSeance({ ...newSeance, jour: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Day</option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="matiere" className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              id="matiere"
              value={newSeance.matiere}
              onChange={(e) => setNewSeance({ ...newSeance, matiere: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="dateHeureDebut" className="block text-sm font-medium">Start Time</label>
            <input
              type="datetime-local"
              id="dateHeureDebut"
              value={newSeance.dateHeureDebut}
              onChange={(e) => setNewSeance({ ...newSeance, dateHeureDebut: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="dateHeureFin" className="block text-sm font-medium">End Time</label>
            <input
              type="datetime-local"
              id="dateHeureFin"
              value={newSeance.dateHeureFin}
              onChange={(e) => setNewSeance({ ...newSeance, dateHeureFin: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="professeurId" className="block text-sm font-medium">Professor</label>
            <select
              id="professeurId"
              value={newSeance.professeurId}
              onChange={(e) => setNewSeance({ ...newSeance, professeurId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {professeurs.map((prof) => (
                <option key={prof.id} value={prof.id}>{prof.nom} - {prof.specialite}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="classeId" className="block text-sm font-medium">Class</label>
            <select
              id="classeId"
              value={newSeance.classeId}
              onChange={(e) => setNewSeance({ ...newSeance, classeId: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.nom} - {cls.description}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isUpdating ? 'Update Seance' : 'Create Seance'}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl mb-4">Seances</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Day</th>
              <th className="p-2 text-left">Professor</th>
              <th className="p-2 text-left">Class</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seances.map((seance) => (
              <tr key={seance.id} className="border-b border-gray-200">
                <td className="p-2">{seance.matiere}</td>
                <td className="p-2">{seance.jour}</td>
                <td className="p-2">{seance.professeur.nom}</td>
                <td className="p-2">{seance.classe.nom}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditSeance(seance)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSeance(seance.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudOperationsPage;
