let date;

let resume = false;
let discoverSpotifyGitHub = false;
let atelierWebstoreGitHub = false;
let addressBookGitHub = false;
let chipotleScheduleGitHub = false;
let guitarPianoGitHub = false;
let yuumiBotGitHub = false;


window.addEventListener('load', () => {
  // Set the start time when the page is loaded
  date = Date.now();
});

window.addEventListener('click', (e) => {
  const id = e.target.id;

  if (id === 'resume-link') {
    resume = true;
  } else if (id === 'spotify-discovery-link') {
    discoverSpotifyGitHub = true;
  } else if (id === 'atelier-webstore-link') {
    atelierWebstoreGitHub = true;
  } else if (id === 'address-book-link') {
    addressBookGitHub = true;
  } else if (id === 'chipotle-schedule-link') {
    guitarPianoGitHub = true;
  } else if (id === 'yuumi-bot-link') {
    yuumiBotGitHub = true;
  }

});

window.addEventListener('hover', (e) => {

});

window.addEventListener('beforeunload', () => {
  // Calculate the duration of the visit
  const endTime = Date.now();
  const duration = endTime - date;

  // Send a request to your server to track the visit duration
  fetch('/test', {
    method: 'POST',
    body: JSON.stringify({ date, duration, resume, discoverSpotifyGitHub, atelierWebstoreGitHub, addressBookGitHub, chipotleScheduleGitHub, guitarPianoGitHub, yuumiBotGitHub }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
});
