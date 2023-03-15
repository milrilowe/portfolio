import _ from 'lodash'
import React from 'react';

import {
    STRINGS } from '../../global/constants.js'

import String from './String.js'

import './Guitar.css';

const Guitar = ( {fretboard, selectedNotes, onClick} ) => {
    return (
        <div className = "guitar">
            {fretboard.map((string) => (
                <String 
                    string = {string}
                    selectedNotes = {selectedNotes}
                    onClick = {onClick}
                />
            ))}
        </div>
    )
}

export default Guitar