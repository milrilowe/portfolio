import React from 'react';

import './Key.css';
import Note from '../Note.js';


const Key = ( { thisKey, selectedNotes, onClick } ) => {
    //key is special prop not forwarded by react
    const key = thisKey;
    let keyClassName = "key";

    const noteIsSharp = () => {
        return key.note.length > 2;
    }

    if (noteIsSharp()) {
        keyClassName += " sharp"
    }

    return (
        <div className = {keyClassName} onClick = {() => onClick(key.note)}>
            {<Note
                type = {keyClassName}
                note = {key.note}
                selectedNotes = {selectedNotes}
            />}
        </div>
    )
}

export default Key