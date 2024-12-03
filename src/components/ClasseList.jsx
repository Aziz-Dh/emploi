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

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Map seances to days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Classes Schedule</h1>
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">{day}</h3>
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Time</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">End Time</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Matiere</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Professeur</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Classe</th>
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
                    <tr key={seance.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{new Date(seance.dateHeureDebut).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{new Date(seance.dateHeureFin).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{seance.matiere}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{prof ? `${prof.nom} - ${prof.specialite}` : 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{cls ? `${cls.nom} - ${cls.description}` : 'N/A'}</td>
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
