$(document).ready(function(){
  const links = document.querySelectorAll(".navbar ol li a");
  const sections = document.querySelectorAll("section");

  var resumeIsOpen = false;
  var lastCurrentPage = $("#home-link");

  var projectIndex = 0;

  const visitorRetrieved = new Event("visitor-retrieved");

  let visitor;



  /**
   * Gets info about vistor
   * @returns info about visitor
   */
  let getVisitor = async () => {
    let response = await fetch('/visitors/me', {
      method: 'GET',
    })

    visitor = await response.json();
  }

  /**
   * Triggers event listener when visitor information retrieved
   */
  getVisitor().then(() => {
    document.dispatchEvent(visitorRetrieved);
  });

  /**
   * Adds current class to appropriate link
   */
  var setCurrentPage = function(page) {
    if (page !== $("#resume-link")[0]) {
      lastCurrentPage = page;
    }

    $("a").removeClass("current");
    $(page).addClass("current");
  }

  /**
   * Opens resume modal
   */
  var openResume = function() {
    $(".popup-overlay, .popup-content").addClass("active");

    resumeIsOpen = true;

    document.dispatchEvent(new Event("resume-opened"));

    setCurrentPage($("#resume-link")[0]);
  };

  /**
   * Closes resume modal
   */
  var closeResume = function() {
    $(".popup-overlay, .popup-content").removeClass("active");

    resumeIsOpen = false;

    document.dispatchEvent(new Event("resume-closed"));

    setCurrentPage(lastCurrentPage);
  }

  /**
   * Onclick func closes resume modal if open
   */
  $("main").on("click", function(e) {
    if ($(e.target).hasClass("resume-link") && !resumeIsOpen) {
        openResume();
    } else if (resumeIsOpen) {
        closeResume();
    }
  });

  /**
   * OnScroll update current nav link
   */
  $("#pages").scroll(function (e) {
    var current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const pageYOffset = e.originalEvent.srcElement.scrollTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((a) => {
      a.classList.remove("current");
      if (a.classList.contains(current)) {
        setCurrentPage(a);
      }
    });
  });

  /**
   * Smooth scroll on anchor link click
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        try {
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
        } catch (e) {

        }
    });
  });

  /**
   * Hides toggle button (if first or last element)
   */
  const hideToggle = (toggle) => {
    toggle.addClass("hidden");
  }

  /**
   * Handles clicking to move Project cards to left
   */
  handleProjectToggleLeftClick = () => {
    projectIndex--;

    if (projectIndex < 1) {
      hideToggle($("#left-toggle"));
    }

    $("#right-toggle").removeClass("hidden");
    $("#projects-cards").css("left", `-${projectIndex}00vw`);
  }

  /**
   * Handles clicking to move Project cards to right
   */
  handleProjectToggleRightClick = () => {
    projectIndex++;

    if (projectIndex > 4) {
      hideToggle($("#right-toggle"));
    }

    $("#left-toggle").removeClass("hidden");
    $("#projects-cards").css("left", `-${projectIndex}00vw`);
  }

  /**
   * Toggle left
   */
  $("#left-toggle").on("click", function() {
    handleProjectToggleLeftClick();

  });

  /**
   * Toggle right
   */
  $("#right-toggle").on("click", function() {
    handleProjectToggleRightClick();
  });

  /**
   * Blurs card on mouse enter
   * @param {*} e
   */
  var handleMouseEnter = (e) => {
    if (window.innerWidth > 751) {
      $(`#${e.currentTarget.id} .card-background`).css("background-image", `url(/assets/${e.currentTarget.id}-blur.png)`);
      $(`#${e.currentTarget.id} .card-content`).css("visibility", "visible");
    }
  }

  /**
   * Unblurs card on mouse exit
   * @param {*} e
   */
  var handleMouseExit = (e) => {
    if (window.innerWidth > 751) {
      $(`#${e.currentTarget.id} .card-background`).css("background-image", `url(/assets/${e.currentTarget.id}.png)`);
      $(`#${e.currentTarget.id} .card-content`).css("visibility", "hidden");
    }

  }

  /**
   * Handles blurring and unblurring card
   */
  $(".card").mouseover(function(e) {
    handleMouseEnter(e);
  }).mouseleave(function(e) {
    handleMouseExit(e);
  });

  const firstVisitInnerHTML = () => {
    document.getElementById('visitor_views').innerHTML = 'Welcome! This is your first visit!';
  }

  const repeatVisitInnerHTML = () => {
    const visitor_views = `You have contributed to ${visitor.visits + 1} of X total views (by Y unique viewers). In those ${visitor.visits + 1} visits, you have spent ${Math.floor((visitor.timeSpentSite + 1) / 1000)} seconds here.`;
  }

  document.addEventListener("visit-project", function(visit) {
    visit = visit.detail.visit;
    projectsPlea(visit);
  });

  document.addEventListener("visit-resume", function(e) {
    let visit = e.detail.visit;

    resumePlea(visit);

  });

  const resumePlea = (visit) => {
    let totalResumeDuration = (visitor.timeSpentResume / 1000) + (visit.timeSpentResume / 1000);

    let totalResumeDurationString = () => {
      let s = Math.floor(totalResumeDuration) + ' second';
      if (s !== 1) {
        s += 's'
      }

      return s;
    }

    if (totalResumeDuration > 0 && totalResumeDuration < 30) {
      document.getElementById('resume_plea').innerHTML = `I noticed you only looked at my resume for like, ${totalResumeDurationString()}. But is that really enough time to get a good impression of someone? <a href="#" class="resume-link">Please, please, please, please, PLEASE take a more thorough look.</a> I\'ve worked so hard on it. I built it using <a href="https://www.overleaf.com/" target="_blank">LaTeX</a>.`;
    } else if (totalResumeDuration >= 30) {
      document.getElementById('resume_plea').innerHTML = 'WOW! Thank you SO MUCH for taking a thorough look at my resume. It means a lot! Thank you!';
    }
  }

  const projectsPlea = (visit) => {
    let allProjectsVisited = true;

    let projects = ['discoverSpotifyGitHub', 'atelierWebstoreGitHub', 'addressBookGitHub', 'chipotleScheduleGitHub', 'guitarPianoGitHub', 'yuumiBotGitHub'];
    console.log(visit)
    for (project of projects) {
      if (!visit[project] && !visitor[project]) {
        allProjectsVisited = false;
      }
    }

    if (allProjectsVisited) {
      document.querySelector("#traffic .text_container .project_plea").innerHTML = "<h3>Thank you for checking out all of my projects!</h3>";
    }

    if (visit.discoverSpotifyGitHub) {
      try {
        document.querySelector("#unseen-projects #discover-spotify-link").remove();
      } catch (e) {

      }
    }

    if (visit.atelierWebstoreGitHub) {
      try {
        document.querySelector("#unseen-projects #atelier-webstore-link").remove();
      } catch (e) {

      }
    }

    if (visit.addressBookGitHub) {
      try {
        document.querySelector("#unseen-projects #address-book-link").remove();
      } catch (e) {

      }
    }

    if (visit.guitarPianoGitHub) {
      try {
        document.querySelector("#unseen-projects #guitar-piano-link").remove();
      } catch (e) {

      }
    }

    if (visit.chipotleScheduleGitHub) {
      try {
        document.querySelector("#unseen-projects #chipotle-schedule-link").remove();
      } catch (e) {

      }
    }

    if (visit.yuumiBotGitHub) {
      try {
        document.querySelector("#unseen-projects #yuumi-bot-link").remove();
      } catch (e) {

      }
    }
  }

  document.addEventListener("visitor-retrieved", function() {
    resumePlea(visitor);
    projectsPlea(visitor);

    if (Object.keys(visitor).length !== 0) {
      repeatVisitInnerHTML();
    } else {
      firstVisitInnerHTML();
    }
  })
});