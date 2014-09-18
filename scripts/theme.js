jQuery(window).load(function(){

  if ( $('.slides li').size() > 1 ) {

    $('.flexslider').flexslider({
      animation: "slide",
      slideshow: true,
      animationDuration: 700,
      slideshowSpeed: 6000,
      animation: "fade",
      controlsContainer: ".flex-controls",
      controlNav: false,
      keyboardNav: true
    }).hover(function(){ $('.flex-direction-nav').fadeIn();}, function(){$('.flex-direction-nav').fadeOut();});

  }

  // toggle form for custom products
  $(".form-custom-link").click(function(e) {
    e.preventDefault();
    $(".form-hider").slideToggle();
  });

  $("select.loc_on_change").change(function(){
    if($(this).attr("value") == "#") return false;
    window.location = $(this).attr("value");
  });

  // a#placeholder is parent of image for product
  var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
  if(IE6){
    if($("#placeholder img").width() > 360){
      $("#placeholder img").css('width', '360px');
    } else {
      $("#placeholder img").css('width', $("#placeholder img").width()+'px'); // restrict to initial width of image
    }
  } else {
    $("#placeholder img").css('maxWidth', $("#placeholder img").width()+'px'); // restrict to initial width of image
  }

  var pw = $("#placeholder img").width() + 8;
  $("#placeholder img").parents('div.featured').css('maxWidth', pw+'px'); // force IE to play nice

});

jQuery(document).ready(function($){

  $("nav.mobile select").change(function(){ window.location = jQuery(this).val(); });

  // swap thumb image and main image on click
  $('#product .thumbs a').click(function(){
    $('#placeholder').attr('href', $(this).attr('href'));
    $('#placeholder img').attr('src', $(this).attr('data-original-image'))
    $('#zoom-image').attr('href', $(this).attr('href'));
    return false;
  });

  $('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
    $(this).blur();
  })

  $("li.dropdown").hover(function(){
    $(this).children('.dropdown').show();
    $(this).children('.dropdown').stop();
    $(this).children('.dropdown').animate({
      opacity: 1.0
    }, 200);
  }, function(){
    $(this).children('.dropdown').stop();
    $(this).children('.dropdown').animate({
      opacity: 0.0
    }, 400, function(){
      $(this).hide();
    });
  });

  // $('a[href^="#"]').bind('click.smoothscroll',function (e) {

  //   e.preventDefault();

  //   var target = this.hash,
  //       $target = $(target);

  //   $('html, body').stop().animate({
  //       'scrollTop': $target.offset().top
  //   }, 500, 'swing', function () {
  //       window.location.hash = target;
  //   });
  // });

  var tabs = $('ul.tabs > li > a');
  tabs.each(function(i) {
    jQuery(this).unbind('click.smoothscroll')
    .click(function(e) {
         var contentLocation = $(this).attr('href');
       if(contentLocation.charAt(0)=="#") {
      tabs.removeClass('active');
      $(this).addClass('active');
      $(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
       }
      return false;
    });
  });

}); // end document ready
