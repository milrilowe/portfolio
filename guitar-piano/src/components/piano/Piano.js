import _ from 'lodash';
import React from 'react';

import './Piano.css';

import Key from './Key.js';

const Piano = ( { keyboard, selectedNotes, onClick } ) => {

    return (
        <div className = "piano">
            {keyboard.map((key) => (
                <Key 
                    thisKey = {key}
                    selectedNotes = {selectedNotes}
                    onClick = {onClick}
                />
            ))}
        </div>
    )    
}

export default Piano