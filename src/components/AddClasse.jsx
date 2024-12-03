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
        setError('An error occurred while adding the class.');
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Class Name:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Class'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default AddClass;
