import React from "react";
import './register.css'
import { useState } from "react";
export default function Register({setShowLogin , setAuthenticated}){

 const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');

  async function handleLogin(username, password) {
    try {
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        setAuthenticated(true);
        localStorage.setItem('id',data.userId)
        localStorage.setItem('token',data.token)
        seterror('');
      } else {
        console.error('Signup failed:', data.message);
        seterror(data.message);
      }
    } catch (error) {
      console.error('Error occurred during Sign up:', error);
      seterror("Something went wrong. Please try again.");
    }
  }
    return(
        <>
        <div className="mainlogin">
         <h2>Sign Up</h2>

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
                 <button onClick={()=>setShowLogin(true)}>Log In</button>

        <p id="error">{error}</p>
        </div>
        </>
    )

}