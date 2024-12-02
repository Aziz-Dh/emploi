import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClassesList from './components/ClasseList';
import CrudOperationsPage from './components/CrudOperationsPage';
import AddClasse from './components/AddClasse';
import AddProfesseur from './components/AddProfesseur';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <nav>
          {/* Navigation links */}
          <ul>
           
          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
       
          <Route path="/" element={<ClassesList />} /> {/* Default route */}
          <Route path="/crud-operations" element={<CrudOperationsPage />} 
          
          
          /> 
          <Route path="/add-classe" element={<AddClasse />} />
          <Route path="/add-prof" element={<AddProfesseur />} />
          
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
