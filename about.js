

$(".block").on("click", function () {
    $("#mobile-menu").removeClass('hidden');
      $("#mobile-menu").addClass('block');
  
      $("#menu").removeClass('hidden');
      $("#menu").addClass('block');
  
      $("#x-menu").removeClass('block');
      $("#x-menu").addClass('hidden');
  })
  
  $("#mobile-menu").on("click", function () {
  
    $("#menu").removeClass('block');
      $("#menu").addClass('hidden');
  
      $("#mobile-menu").removeClass('block');
      $("#mobile-menu").addClass('hidden');
  
      $("#x-menu").removeClass('hidden');
      $("#x-menu").addClass('block');
  })