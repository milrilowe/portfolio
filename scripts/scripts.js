$(document).ready(function(){
  var resumeIsOpen = false;
  var resumeIsClicked = false;

  var openResume = function() {
    $(".popup-overlay, .popup-content").addClass("active");
  };

  var closeResume = function() {
    $(".popup-overlay, .popup-content").removeClass("active");
  }

  /**
   *
   */
  $("#resume-link").click(function() {
    if (!resumeIsOpen) {
      openResume();
      resumeIsOpen = true;
    } else {
      closeResume();
      resumeIsOpen = false;
    }


    resumeIsClicked = true;
  });

  /**
   *
   */
  $("section").on("click", function() {
    if (!resumeIsClicked) {
      closeResume();
      resumeIsOpen = false;
    }

    resumeIsClicked = false;

  });
});