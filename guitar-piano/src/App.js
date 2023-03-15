import logo from './logo.svg';
import './App.css';
import Guitar from './components/guitar/Guitar.js';
import Piano from './components/piano/Piano.js';

import { useState } from 'react'

import {
        NOTES,
        STRINGS,
        } from './global/constants.js';

function App() {
  //selectedNotes is an array of selected notes which Piano and Guitar use as props so they know what notes to highlight
  const [selectedNotes, setSelectedNotes] = useState([])

  //Sets up fretboard prop to be passed into guitar
  const fretboard = STRINGS.map((string, index) => {
    //First fret is 'dotted' in CSS
    let dotted = false;
    if (index === 0) {
      dotted = true;
    }

    let fret = string;
    let frets = Array(13)
        .fill()
        .map(() => NOTES[(fret++)]);

      const s = {
        string: string,
        index: index,
        dotted: dotted,
        frets: frets
      }

      return s;

  });

  //Sets up keys on piano to be passed into piano
  const keyboard = NOTES.map(note => {

    const key = {
      note: note,
    }
    return key;
  });

  //When a fret or key is selected
  const onClick = (component) => {
    if(selectedNotes.includes(component)) {
      setSelectedNotes(selectedNotes.filter((note) => component !== note))
    } else {
      if(selectedNotes.length === 6) {
        setSelectedNotes(selectedNotes.shift())
      }

      setSelectedNotes([...selectedNotes, component])
    }
  }

  //Instead of deselecting every note, you can double click background to clear
  const clear = () => {
    setSelectedNotes([])
  }

  return (
    <div className="GuitarPiano" onDoubleClick = {() => clear()}>
      <header className="App-header">
        <Piano
          keyboard = {keyboard}
          selectedNotes = {selectedNotes}
          onClick = {onClick}
        />

        <Guitar
          fretboard = {fretboard}
          selectedNotes = {selectedNotes}
          onClick = {onClick}
        />
        <a style = {{"padding-top": 50}}/>
        <p> (Double Click to Clear) </p>
      </header>

    </div>
  );
}

export default App

//test