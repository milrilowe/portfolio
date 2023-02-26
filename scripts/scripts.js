$(document).ready(function(){
  var resumeIsOpen = false;
  var resumeWasClicked = false;
  var lastCurrentPage = $("#home-link");

  /**
   * Opens resume modal
   */
  var openResume = function() {
    $(".popup-overlay, .popup-content").addClass("active");
    $("section").addClass("dim");
  };

  /**
   * Closes resume modal
   */
  var closeResume = function() {
    $(".popup-overlay, .popup-content").removeClass("active");
    $("section").removeClass("dim");
    setCurrentPage(lastCurrentPage);
  }

  /**
   * Clears current page class from all links
   */
  var clearCurrentPage = function() {
    $("a").removeClass("current");
  }

  /**
   * Adds current class to appropriate link
   */
  var setCurrentPage = function(page) {
    if (page !== $("#resume-link")[0]) {
      lastCurrentPage = page;
    }

    clearCurrentPage();
    $(page).addClass("current");
  }

  /**
   * Onclick func sets current class to clicked link
   */
  $("a").click(function() {
    if (!resumeWasClicked) {
      setCurrentPage(this);
    }
  });

  /**
   * Onclick func opens/closes resume modal
   */
  $("#resume-link").click(function() {
    if (!resumeIsOpen) {
      openResume();
      resumeIsOpen = true;
    } else {
      closeResume();
      resumeIsOpen = false;
    }

    resumeWasClicked = true;
  });

  /**
   * Onclick func closes resume modal if open
   */
  $("section").on("click", function() {
    if (resumeIsOpen && !resumeWasClicked) {
      closeResume();
      resumeIsOpen = false;
    }
    
    resumeWasClicked = false;
  });
});