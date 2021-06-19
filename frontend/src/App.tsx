import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/login-page/LoginPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App;
