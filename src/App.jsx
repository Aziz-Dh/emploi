import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ClassesList from './components/ClasseList';
import CrudOperationsPage from './components/CrudOperationsPage';
import AddClasse from './components/AddClasse';
import AddProfesseur from './components/AddProfesseur';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:bg-blue-500 p-2 rounded">Home</Link>
            </li>
            <li>
              <Link to="/crud-operations" className="text-white hover:bg-blue-500 p-2 rounded">CRUD Operations</Link>
            </li>
            <li>
              <Link to="/add-classe" className="text-white hover:bg-blue-500 p-2 rounded">Add Classe</Link>
            </li>
            <li>
              <Link to="/add-prof" className="text-white hover:bg-blue-500 p-2 rounded">Add Professeur</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<ClassesList />} /> {/* Home Page */}
          <Route path="/crud-operations" element={<CrudOperationsPage />} />
          <Route path="/add-classe" element={<AddClasse />} />
          <Route path="/add-prof" element={<AddProfesseur />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
