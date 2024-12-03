import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassesList = () => {
  const [seances, setSeances] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch classes
    axios.get('http://localhost:8080/api/classes')
      .then((response) => setClasses(response.data))
      .catch(() => setError('Error fetching classes'));

    // Fetch professeurs
    axios.get('http://localhost:8080/professeur')
      .then((response) => setProfesseurs(response.data))
      .catch(() => setError('Error fetching professors'));

    // Fetch seances
    axios.get('http://localhost:8080/seance')
      .then((response) => {
        setSeances(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching seances');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Map seances to days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <h1>Classes Schedule</h1>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Matiere</th>
                <th>Professeur</th>
                <th>Classe</th>
              </tr>
            </thead>
            <tbody>
              {seances
                .filter((seance) => seance.jour === day) // Filter seances by the current day
                .map((seance) => {
                  // Ensure prof and cls are found correctly
                  const prof = professeurs.find((p) => p.id === seance.professeur?.id);
                  const cls = classes.find((c) => c.id === seance.classe?.id);

                  return (
                    <tr key={seance.id}>
                      <td>{new Date(seance.dateHeureDebut).toLocaleString()}</td>
                      <td>{new Date(seance.dateHeureFin).toLocaleString()}</td>
                      <td>{seance.matiere}</td>
                      <td>{prof ? `${prof.nom} - ${prof.specialite}` : 'N/A'}</td>
                      <td>{cls ? `${cls.nom} - ${cls.description}` : 'N/A'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ClassesList;
