import React, { useState } from "react";
import './login.css';

export default function Login({setShowLogin, setAuthenticated}) {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  async function handleLogin(username, password) {
    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('id',data.userId)
    
        setAuthenticated(true)
        localStorage.setItem('token', data.token);
        seterror('');
      } else {
        console.error('Login failed:', data.message);
        seterror(data.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      seterror("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <div className="mainlogin">
        <h2>Login</h2>
       
        <input
          name="username"
          id="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
        />
        
        <button id="submit" onClick={() => handleLogin(username, password)}>Submit</button>
        
         <button  onClick={()=>setShowLogin(false)}>Sign up</button>
         
        <p id="error">{error}</p>
      </div>
    </>
  );
}
