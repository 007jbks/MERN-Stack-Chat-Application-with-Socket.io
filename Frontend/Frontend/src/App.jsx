import { useState } from 'react';
import './App.css';
import Login from './components/login.jsx';
import Register from './components/register.jsx';
import Chat from './components/chat.jsx';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true); 
  return (
    <>
      {isAuthenticated ? (
        <Chat/>
      ) : showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          setAuthenticated={setAuthenticated}
        />
      ) : (
        <Register
          setShowLogin={setShowLogin}
          setAuthenticated={setAuthenticated}
        />
      )}
    </>
  );
}

export default App;
