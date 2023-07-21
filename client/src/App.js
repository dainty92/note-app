import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NotesList';
import AuthForm from './AuthForm';
import NotesApp from './NotesApp';
// import RichTextEditor from './components/RichTextEditor';
import 'App.css';
import './AuthForm.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleRegister = async (userData) => {
    try {
      // Make an API call to register the user
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Pass the user data to the API request
      });

      // Check if the registration was successful
      if (response.ok) {
        // On successful registration, set the authenticated state to true
        // to show the login form and then transition to the NotesApp
        setAuthenticated(true);
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData.error);
        // Handle the registration error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      // Handle any other registration errors (e.g., network error)
    }
  };

  const handleLogin = async (userData) => {
    try {
      // Make an API call to log in the user
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Pass the user data to the API request
      });

      // Check if the login was successful
      if (response.ok) {
        // On successful login, set the authenticated state to true
        // to show the NotesApp
        setAuthenticated(true);
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.error);
        // Handle the login error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      // Handle any other login errors (e.g., network error)
    }
  };

    const [notes, setNotes] = useState([]);

  // Fetch the notes data using useEffect and set it to the 'notes' state
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/notes');
  
        if (response.ok) {
          const notesData = await response.json();
          setNotes(notesData);
        } else {
          console.error('Failed to fetch notes:', response.status);
          // Handle the fetch notes error (e.g., show an error message)
        }
      } catch (error) {
        console.error('An error occurred during fetch notes:', error);
        // Handle any other fetch notes errors (e.g., network error)
      }
    };
  
    // Call the fetchNotes function to get notes after successful login
    if (authenticated) {
      fetchNotes();
    }
  }, [authenticated]);

  return (
    <div>
      {!authenticated ? (
        <AuthForm
          onLoginSuccess={handleLoginSuccess}
          onRegister={handleRegister} // Pass the handleRegister function as a prop
          onLogin={handleLogin} // Pass the handleLogin function as a prop
        />
      ) : (
        <NotesApp>
          <NoteForm />
          <NoteList notes={notes} />
          {/* <RichTextEditor /> */}
        </NotesApp>
      )}
    </div>
  );
};

export default App;
