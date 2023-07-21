import React, { useState } from 'react';
import 'AuthForm.css';

const AuthForm = ({ onLogin, onRegister, loginError, registerError, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterView, setRegisterView] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Call the onRegister prop and pass the username and password
    onRegister({ name, username, password });
    setUsername('');
    setPassword('');
    setName('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Call the onLogin prop and pass the username and password
    const loginSuccess = await onLogin({ username, password });
    if (loginSuccess) {
      onLoginSuccess();
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
      <img className="logo" src="/Group 1 (4).png" alt="Logo" />

      <h3>NotePro</h3>
      {isRegisterView ? (
        <>
          {/* Display the register form */}
          <form onSubmit={handleRegisterSubmit} className="form-group">
          <label className='label'>
              Name:
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="register-name"
              />
          </label>
          <label className='label'>
              Username:
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="register-username"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="register-password"
              />
            </label>
            {/* Add any additional login form fields here */}
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <span className='auth' onClick={() => setRegisterView(false)}>Login</span></p>
        </>
        ) : (
        <>
          {/* Display the login form */}
          <form onSubmit={handleLoginSubmit} className="form-group">
            <label className='label'>
              Username:
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="login-username"
              />
            </label>
            <label className='label'>
              Password:
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="login-password"
              />
            </label>
            {/* Add any additional login form fields here */}
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <span className='auth' onClick={() => setRegisterView(true)}>Register</span></p>
        </>
      )}
    </div>
  );
}

export default AuthForm;
