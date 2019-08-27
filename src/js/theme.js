(function($) {
  $(window).ready(() => {
    $(".backoffice-header .user").on("dragstart", function(e) {
      e.preventDefault();

      return false;
    });
  });
})($);
