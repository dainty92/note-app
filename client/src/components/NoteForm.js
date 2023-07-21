import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import '../NotesApp.css'

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    // Call the onSubmit prop and pass the new note data
    onSubmit({ title, content: rawContentState });
    setTitle('');
    setEditorState(EditorState.createEmpty());
    // setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='note-form'>
      <div className='form-group'>
      <label>Title</label>
      <input className='title'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </div>
      <div className='form-group'>
      <label>Content</label>
        <div className="rich-text-editor">
          <div className='text-editor'>
            <button onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))}>Bold</button>
            <button onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))}>Italic</button>
            <button onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))}>Underline</button>
          </div>
          <div>
            <Editor editorState={editorState} onChange={setEditorState} />
          </div>
        </div>
      </div>
      {/* <textarea className='content'
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      </div> */}
      
      <button type="submit" className='add-note-button'>Save Note</button>
    </form>
  );
};

export default NoteForm;
