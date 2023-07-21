import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import '../App.css';

const NoteCard = ({ title, content }) => {
  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div className="note-card">
      <h3>{title}</h3>
      <div className="editor-preview">
        <Editor editorState={editorState} readOnly />
      </div>
      {/* <p>{content}</p> */}
    </div>
  );
};

export default NoteCard;
