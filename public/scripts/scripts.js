$(document).ready(function(){
  const links = document.querySelectorAll(".navbar ol li a");
  const sections = document.querySelectorAll("section");

  var resumeIsOpen = false;
  var lastCurrentPage = $("#home-link");

  var projectIndex = 0;

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
    $("#pages").addClass("dim");
    resumeIsOpen = true;

    setCurrentPage($("#resume-link")[0]);
  };

  /**
   * Closes resume modal
   */
  var closeResume = function() {
    $(".popup-overlay, .popup-content").removeClass("active");
    $("#pages").removeClass("dim");
    setCurrentPage(lastCurrentPage);
    resumeIsOpen = false;
  }


  /**
   * Onclick func closes resume modal if open
   */
  $("main").on("click", function(e) {
    if (e.target === $("#resume-link")[0]) {
      if (!resumeIsOpen) {
        openResume();
      } else {
        closeResume();
      }
    } else {
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

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });

  /**
   *
   */
  const hideToggle = (toggle) => {
    toggle.addClass("hidden");
  }

  /**
   *
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
   *
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
   *
   */
  $("#left-toggle").on("click", function() {
    handleProjectToggleLeftClick();

  });

  /**
   *
   */
  $("#right-toggle").on("click", function() {
    handleProjectToggleRightClick();
  });

  /**
   *
   * @param {*} e
   */
  var handleMouseEnter = (e) => {
    $(`#${e.currentTarget.id} .card-background`).css("filter", "blur(8px)");
    $(`#${e.currentTarget.id} .card-background`).css("-webkit-filter", "blur(8px)");
  }

  /**
   *
   * @param {*} e
   */
  var handleMouseExit = (e) => {
    $(`#${e.currentTarget.id} .card-background`).css("filter", "blur(0)");
    $(`#${e.currentTarget.id} .card-background`).css("-webkit-filter", "blur(0)");
  }

  /**
   *
   */
  $(".card").mouseover(function(e) {
    handleMouseEnter(e);
  }).mouseleave(function(e) {
    handleMouseExit(e);
  });
});