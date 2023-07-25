// import React, { useState } from 'react';
// import { Editor, EditorState } from 'draft-js';
import '../NotesApp.css'

const RichTextEditor = () => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // const handleStyleButtonClick = (style) => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  // };

  return (
    <div className="rich-text-editor">
      {/* <div className='text-editor'>
        <button onClick={() => handleStyleButtonClick('BOLD')}>Bold</button>
        <button onClick={() => handleStyleButtonClick('ITALIC')}>Italic</button>
        <button onClick={() => handleStyleButtonClick('UNDERLINE')}>Underline</button>
      </div> */}
      {/* <div>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div> */}
    </div>
  );
};

export default RichTextEditor;
