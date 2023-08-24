import React, { useState } from 'react';
import './AuthForm.css';
import InputField from './InputField';

const AuthForm = ({ onLogin, onRegister, loginError, registerError, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterView, setRegisterView] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !username || !password) {
      setFormErrors({ name: !name, username: !username, password: !password });
      return;
    }

    // Call the onRegister prop and pass the username and password
    onRegister({ name, username, password });
    setName('');
    setUsername('');
    setPassword('');
    setFormErrors({});
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (!username || !password) {
      setFormErrors({ username: !username, password: !password });
      return;
    }

    // Call the onLogin prop and pass the username and password
    const loginSuccess = await onLogin({ username, password });
    if (loginSuccess) {
      onLoginSuccess();
    }
    setUsername('');
    setPassword('');
    setFormErrors({});
  };

  return (
    <div className="container">
      <img className="logo" src="/Group 1 (4).png" alt="Logo" />

      <h3>NotePro</h3>
      {isRegisterView ? (
        <>
          {/* Display the register form */}
          <form onSubmit={handleRegisterSubmit} className="form-group">
          <InputField
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ariaLabel="register-name"
              error={formErrors.name && "Name is required"} // Provide error message
          />
          <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="register-username"
              error={formErrors.name && "Username is required"}
          />
          <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password for Registration"
                error={formErrors.name && "Password is required"}
          />
            {/* Add any additional login form fields here */}
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <span className='auth' onClick={() => setRegisterView(false)}>Login</span></p>
        </>
        ) : (
        <>
          {/* Display the login form */}
          <form onSubmit={handleLoginSubmit} className="form-group">
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ariaLabel="login-username"
              error={formErrors.username && "Username is required"} // Provide error message
            />
            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password for Registration"
                error={formErrors.name && "Password is required"}
            />
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
