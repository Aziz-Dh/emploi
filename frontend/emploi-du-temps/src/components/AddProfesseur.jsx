import React, { useState } from 'react';
import axios from 'axios';

const AddProfesseur = ({ onProfesseurAdded }) => {
  // State to hold the form data
  const [nom, setNom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [email, setEmail] = useState('');

  // State to handle loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the page from reloading on submit

    // Set loading to true while waiting for the request to complete
    setLoading(true);
    setError('');  // Reset error message

    // Send a POST request to the API to add a new professeur
    axios
      .post('http://localhost:8080/professeur', { nom, specialite, email })  // Replace with your API endpoint
      .then((response) => {
        setLoading(false);
        setNom('');  // Clear the form
        setSpecialite('');
        setEmail('');
        onProfesseurAdded();  // Notify parent that a professeur was added
      })
      .catch((error) => {
        setLoading(false);
        
      });
  };

  return (
    <div>
      <h2>Add Professeur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Speciality:</label>
          <input
            type="text"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Professeur'}
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AddProfesseur;
