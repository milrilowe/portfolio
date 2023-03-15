import _ from 'lodash';
import React from 'react';
import './String.css';

import { NOTES } from '../../global/constants.js';

import Fret from './Fret.js';


const String = ( {string, selectedNotes, onClick} ) => {
    return (
        //Style the strings to grow in thickness
        <div className = "string" 
            style = {{"--thickness": 2 + string.index * 1.3}}>
            {string.frets.map((fret, index) => (
                <Fret 
                    fret = {fret}
                    index = {index}
                    dotted = {string.dotted}
                    selectedNotes = {selectedNotes}
                    onClick = {onClick}
                />
            ))}
        </div>
    )
}

export default String