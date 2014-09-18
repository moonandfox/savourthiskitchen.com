$(document).ready(function() {

  // general fancybox class
  // used in Press page
  $('.fancybox').fancybox({
    prevEffect	: 'none',
    nextEffect	: 'none',
    helpers: {
      // thumbs: {
      //   width: 50,
      //   height: 50
      // }
    }
  });

  // product fancybox
  // TODO: confirm this is disabled (DO NOT WANT)
  $("a.zoom").fancybox({
    padding:0,
    'titleShow': false,
    overlayColor: '#000000',
    overlayOpacity: 0.2
  });
});
