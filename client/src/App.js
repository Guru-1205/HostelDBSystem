import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Root from './Root';
import AddStudent from './AddStudent';
import StudentDetails from './StudentDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/root" element={<Root />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student/:id" element={<StudentDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
