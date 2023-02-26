$(document).ready(function(){
  var resumeIsOpen = false;
  var lastCurrentPage = $("#home-link");

  /**
   * Opens resume modal
   */
  var openResume = function() {
    $(".popup-overlay, .popup-content").addClass("active");
    $("#pages").addClass("dim");
    resumeIsOpen = true;
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
   * Onclick func sets current class to clicked link
   */
  $("a").click(function() {
    setCurrentPage(this);
  });

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
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".navbar ol li a");
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
});