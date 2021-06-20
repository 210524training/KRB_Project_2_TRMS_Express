import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import User from './models/user';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  let [currentUser, setCurrentUser] = useState<User | undefined>()
  return (
    <div className="App">
      <Router>
        <Header />
        <AppRoutes currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
