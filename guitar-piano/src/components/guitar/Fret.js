import React from 'react';
import './Fret.css';

import Note from '../Note.js';
import { NOTES } from '../../global/constants.js'

const Fret = ( {fret, index, dotted, selectedNotes, onClick} ) => {
    let fretClassName = "fret";

    //Nut is note played on an open string
    const fretIsNut = () => {
        return index === 0;
    }

    if(fretIsNut(index)) {
        fretClassName += " nut";
    }

    //When a fret needs to be dotted, we will only dot the frets on the highest string, otherwise we get 6 dots (1 per string)
    if (dotted) {
        const fretIsSingleDotted = () => {
            return index === 3 || index === 5 || index === 7 || index === 9;
        }
        
        const fretIsDoubleDotted = () => {
            return index === 12;
        }

        if(fretIsSingleDotted()) {
            fretClassName += " singledot"
        } else if(fretIsDoubleDotted()) {
            fretClassName += " doubledot"
        }
    }

    return (
        <div className = {fretClassName}
        //1st fret is twice as wide as 12th fret,
        style = {{"--fret-ratio": (24 - index) / 24}}
        onClick = {() => onClick(fret)}>
            <Note
                type = {'fret'}
                note = {fret}
                selectedNotes = {selectedNotes}
            />
        </div>
    )
}

export default Fret