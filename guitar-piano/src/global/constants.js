//Notes available on a guitar - there's a distinction between each note of different octaves (E2 is a lower frequency of sound than E3, for example)
const NOTES = [
  'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 
  'C5', 'C#5', 'D5', 'D#5', 'E5',
]

//Basically the tuning of the guitar.  First index will be the highest (frequency) string, which in standard tuning is E4.  We have EADGBE tuning here
const STRINGS = [24, 19, 15, 10, 5, 0];



export {
  NOTES,
  STRINGS,
};