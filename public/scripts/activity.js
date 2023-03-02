let date;

let timeSiteOpened;

let timeSpentResume = 0;
let timeResumeOpened;
let timeResumeClosed;

let discoverSpotifyGitHub = false;
let atelierWebstoreGitHub = false;
let addressBookGitHub = false;
let chipotleScheduleGitHub = false;
let guitarPianoGitHub = false;
let yuumiBotGitHub = false;

document.addEventListener("resume-opened", function () {
  timeResumeOpened = Date.now();
});

document.addEventListener("resume-closed", function () {
  timeResumeClosed = Date.now();
  timeSpentResume += timeResumeClosed - timeResumeOpened;
});

window.addEventListener('load', () => {
  timeSiteOpened = date = Date.now();
});

window.addEventListener('click', (e) => {
  const id = e.target.id;

  if (id === 'discover-spotify-link') {
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
  const timeSpentSite = endTime - timeSiteOpened;

  // Send a request to your server to track the visit duration
  fetch('/visits', {
    method: 'POST',
    body: JSON.stringify({ date, timeSiteOpened, timeSpentSite, timeSpentResume, discoverSpotifyGitHub, atelierWebstoreGitHub, addressBookGitHub, chipotleScheduleGitHub, guitarPianoGitHub, yuumiBotGitHub }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

});
