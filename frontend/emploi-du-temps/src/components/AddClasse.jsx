import React, { useState } from 'react';
import axios from 'axios';

const AddClass = ({ onClassAdded }) => {
  // State to hold the form data
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');

  // State to handle loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the page from reloading on submit

    // Set loading to true while waiting for the request to complete
    setLoading(true);
    setError('');

    // Send a POST request to the API to add a new class
    axios
      .post('http://localhost:8080/api/classes', { nom, description })  // Replace with your API endpoint
      .then((response) => {
        setLoading(false);
        setNom('');  // Clear the form
        setDescription('');
        onClassAdded();  // Notify parent that a class was added
      })
      .catch((error) => {
        setLoading(false);
       
      });
  };

  return (
    <div>
      <h2>Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Name:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Class'}
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AddClass;
