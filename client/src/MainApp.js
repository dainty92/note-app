import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NotesList';
import AuthForm from './AuthForm';
import NotesApp from './NotesApp';
import RichTextEditor from './components/RichTextEditor'
import 'App.css';
import 'AuthForm.css';

const MainApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [isRegisterView, setRegisterView] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleRegister = async ({ username, password , name}) => {
    try {
      // Make an API call to your backend for user registration
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
      });

      // Check if the registration was successful
      if (response.ok) {
        // You can automatically log in the user after successful registration
        await handleLogin({ username, password });
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setAuthenticated(false);
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
      setAuthenticated(false);
    }
  };

  const handleLogin = async ({ username, password }) => {
    try {
      // Make an API call to your backend for login
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',credentials: 'include',
      });

      // Check if the login was successful
      if (response.ok) {
        setAuthenticated(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setAuthenticated(false);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      setAuthenticated(false);
    }
  };

  const handleSaveNote = async (newNote) => {
    try {
      // Make an API call to save the new note
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        // Generate a unique ID for the new note (you can use a library like 'uuid' for this)
        newNote.id = Math.random().toString(36).substr(2, 9);
        // Add the new note to the existing notes array
        setNotes([...notes, newNote]);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An error occurred while saving the note. Please try again.');
    }
  };

  return (
    <div>
      {authenticated ? (
        <NotesApp>
          <NoteForm onSubmit={handleSaveNote} />
          <NoteList notes={notes} />
          <RichTextEditor />
        </NotesApp>
      ) : (
        <AuthForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          loginError={error}
          registerError={error}
          isRegisterView={isRegisterView} // Pass the current view to AuthForm
          setRegisterView={setRegisterView} // Pass the function to change the view
          onLoginSuccess={() => setAuthenticated(true)}
        />
      )}
    </div>
  );
};

export default MainApp;
