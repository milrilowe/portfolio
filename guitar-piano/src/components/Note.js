import _ from 'lodash'
import React from 'react';

import { NOTES } from '../global/constants.js'

import './Note.css';

const Note = ( {type, note, selectedNotes}) => {
    let noteClassName = "note";

    //I want to differentiate whether the note is on a piano or guitar to accomodate them in CSS
    if (type === 'fret') {
        noteClassName += " onFret"
    } else if (type === 'key') {
        noteClassName += " onKey"
    } else if(type === 'key sharp'){
        noteClassName += " onKey sharp"
    }

    //We will only highlight the note if it is selected
    let opacity = 0;
    if(selectedNotes.includes(note)) {
        opacity = 1;
    }

    //I'm limiting number of notes we can highlight to 6, so I define 6 colors
    const colors = [
        'red',
        'darkorange',
        'gold',
        'green',
        'blue',
        'purple'
    ]

    //Some logic to keep the background color of Note element in order (red, orange, yellow...)
    let index = 0;

    if(selectedNotes.includes(note)) {
        for(let i = 0; i < NOTES.length; i++) {
            if(NOTES[i] === note) {
                break
            } else if(selectedNotes.includes(NOTES[i])) {
                index++;
            }
        }
    }

    let color = colors[index];

    return (
        <div 
            className = {noteClassName} 
            data-note = {note.slice(0, -1)} 
            style = {{"--opacity": opacity, "--color": color}}
        >
        </div>

    )
}

export default Note