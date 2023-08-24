import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NotesList';
import AuthForm from './AuthForm';
import NotesApp from './NotesApp';
// import RichTextEditor from './components/RichTextEditor';
import './App.css';
import './AuthForm.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [notes, setNotes] = useState([]);

  const handleLoginSuccess = (token) => {
    setAuthenticated(true);
    setToken(token);
    console.log('Token:', token);
  };

  const handleAddNote = async (noteData) => {
    try {
      // Make an API call to create a new note on the server
      const response = await fetch('https://note-app-fcnj.onrender.com/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Include the actual token in the request headers
        },
        body: JSON.stringify(noteData), // Pass the note data to the API request
      });

      // Log the request details for debugging
    console.log('Request Headers:', response.headers);
    console.log('Request Body:', noteData);

      // Check if the note creation was successful
      if (response.ok) {
        const newNote = await response.json();
        // Handle the new note data (e.g., update the state to include the new note)
        setNotes([...notes, newNote]);
      } else {
        const errorData = await response.json();
        console.error('Note creation error:', errorData.error);
        // Handle the note creation error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred during note creation:', error);
      // Handle any other note creation errors (e.g., network error)
    }
  };

  const handleRegister = async (userData) => {
    try {
      // Make an API call to register the user
      const response = await fetch('https://note-app-fcnj.onrender.com/api/register', {
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
      const response = await fetch('https://note-app-fcnj.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Pass the user data to the API request
      });

      // Check if the login was successful
      if (response.ok) {
        // On successful login, get the token from the response
        const data = await response.json();
        const { token } = data;

        // On successful login, set the authenticated state to true
        // to show the NotesApp
        setAuthenticated(true);
        setToken(token);

        // You can also log the token in the console to verify
        console.log('Token:', token);
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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Skip the fetch request if token is empty
        if (!token) {
          return;
        }
        const response = await fetch('https://note-app-fcnj.onrender.com/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, // Include the actual token in the request headers
          },
        });

        if (response.ok) {
          const notesData = await response.json();
          console.log('Notes Data:', notesData);
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
  }, [authenticated, token]);

  return (
    <div>
      {!authenticated ? (
        <AuthForm
          onLoginSuccess={handleLoginSuccess}
          onRegister={handleRegister}
          onLogin={handleLogin}
        />
      ) : (
        <NotesApp>
          <NoteForm onAddNote={handleAddNote} />
          <NoteList notes={notes} />
          {/* <RichTextEditor /> */}
        </NotesApp>
      )}
    </div>
  );
};

export default App;
