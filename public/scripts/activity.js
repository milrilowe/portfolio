let timeSiteOpened;

let timeResumeOpened;
let timeResumeClosed;

let visit = {
  date: timeSiteOpened,
  timeSpentSite: 0,
  timeSpentResume: 0,
  discoverSpotifyGitHub: false,
  atelierWebstoreGitHub: false,
  addressBookGitHub: false,
  chipotleScheduleGitHub: false,
  guitarPianoGitHub: false,
  yuumiBotGitHub: false,
}

const gitHubLinks = document.querySelectorAll(".github-link a .fa");


window.addEventListener('load', () => {
  timeSiteOpened = visit.date = Date.now();
});

document.addEventListener("resume-opened", function () {
  timeResumeOpened = Date.now();
});

document.addEventListener("resume-closed", function () {
  timeResumeClosed = Date.now();
  visit.timeSpentResume += timeResumeClosed - timeResumeOpened;

  document.dispatchEvent(new CustomEvent("visit-resume", {detail: {visit}}));

});

/**
 * Adds event listener to all the github links, then fires a 'visitor-activity' event
 */
for (link of gitHubLinks) {
  link.addEventListener('click', (e) => {
    const id = e.target.id;

    if (id === 'discover-spotify-link') {
      visit.discoverSpotifyGitHub = true;
    } else if (id === 'atelier-webstore-link') {
      visit.atelierWebstoreGitHub = true;
    } else if (id === 'address-book-link') {
      visit.addressBookGitHub = true;
    } else if (id === 'chipotle-schedule-link') {
      visit.guitarPianoGitHub = true;
    } else if (id === 'yuumi-bot-link') {
      visit.yuumiBotGitHub = true;
    }

    document.dispatchEvent(new CustomEvent("visit-project", {detail: {visit}}));

  });
}

/**
 * Final breath POSTS details of visitor's visit
 */
window.addEventListener('beforeunload', () => {
  try {
    // Calculate the duration of the visit
    const endTime = Date.now();
    visit.timeSpentSite = endTime - timeSiteOpened;



    // Send a request to your server to track the visit duration
    fetch('/visits', {
      method: 'POST',
      body: JSON.stringify(visit),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (e) {
    fetch('/HELP', {method: 'GET'});
  }

});
