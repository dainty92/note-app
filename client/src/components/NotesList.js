import React, { useState } from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-list">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} title={note.title} content={note.content} />
      ))}
    </div>
  );
};

// Set default props for the NotesList component
NotesList.defaultProps = {
  notes: [],
};

export default NotesList;
