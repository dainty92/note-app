import React, { useState, lazy, Suspense } from 'react';
import 'draft-js/dist/Draft.css';
import 'NotesApp.css';

const NoteForm = lazy(() => import('./components/NoteForm'));
const NotesList = lazy(() => import('./components/NotesList'));
const RichTextEditor = lazy(() => import('./components/RichTextEditor'));

const NotesApp = () => {
  const [notes, setNotes] = useState([]);

  const handleSaveNote = (newNote) => {
    // Generate a unique ID for the new note (you can use a library like 'uuid' for this)
    newNote.id = Math.random().toString(36).substr(2, 9);
    // Add the new note to the existing notes array
    setNotes([...notes, newNote]);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='note-body'>
      <div className='note-header'>
      <div className='title-section'>
          <h3 className='note-h3'>NotePro</h3>
          <img className="note-logo" src="/Group 1 (4).png" alt="Logo" />
      </div>
      </div>
      <div className='notes-container'>
      <NoteForm onSubmit={handleSaveNote} />
      <NotesList notes={notes} />
      <RichTextEditor />
      </div>
      </div>
    </Suspense>
  );
};

export default NotesApp;
