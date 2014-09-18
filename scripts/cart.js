$(document).ready(function(){

   function addItem(form_id) {
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: $('#'+form_id).serialize(),
        success: Shopify.onSuccess,
        error: Shopify.onError
      });
   }

   // $(".addtocart").click(function(e){

   //    var elem = $(this)
   //    $(elem).prop("disabled", true)

   //    e.preventDefault();
   //    addItem('add-item-form');

   // });

   Shopify.onSuccess = function() {

      var elem = $('.addtocart');

      elem.removeAttr("disabled");

      var quantity = parseInt(jQuery('[name="quantity"]').val(), 10) || 1;

      $("html, body").animate({ scrollTop: 0 }, 250, 'swing');

      function animate() {

        $("#cart-animation").show();

        var addtocartWidth = elem.outerWidth() / 2
        var addtocartHeight = elem.outerHeight() / 2

        var addtocartLeft = elem.offset().left + addtocartWidth;
        var addtocartTop = $(elem).offset().top + addtocartHeight ;

        var buttonAreaWidth = $("#cart-target").outerWidth();
        var buttonAreaHeight = $("#cart-target").outerHeight();

        var buttonAreaLeft = ($("#cart-target").offset().left + buttonAreaWidth / 2  - $("#cart-animation").outerWidth() / 2) - 4 - 18;
        var buttonAreaTop = ($("#cart-target").offset().top + buttonAreaWidth / 2  - $("#cart-animation").outerHeight() / 2) - 4 - 8;

        var path = {
          start: {
            x: addtocartLeft,
            y: addtocartTop,
            angle: 190.012,
            length: 0.2
          },
          end: {
            x: buttonAreaLeft,
            y: buttonAreaTop,
            angle: 90.012,
            length: 0.50
          }
        };

        $('#cart-animation').text(quantity).animate(
        {
          path : new $.path.bezier(path)
        },
        1200,
        function() {
          $("#cart-animation").fadeOut(500, function() {
            $(elem).prop("disabled", false)
            var cartCount =  parseInt($('#cart-count').text()) + quantity;
            $('#cart-count').text(cartCount)
            $('#cart-target').addClass('has-items');
          })
        }
        );
      }

      animate();
    };

    Shopify.onError = function(XMLHttpRequest, textStatus) {
      // Shopify returns a description of the error in XMLHttpRequest.responseText.
      // It is JSON.
      // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
      var data = eval('(' + XMLHttpRequest.responseText + ')');
      if (!!data.message) {
        alert(data.message + '(' + data.status  + '): ' + data.description);
      } else {
        alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
      }

      $('.addtocart').removeAttr("disabled");
    };

    Shopify.fullMessagesFromErrors = function(errors) {
      var fullMessages = [];
      jQuery.each(errors, function(attribute, messages) {
        jQuery.each(messages, function(index, message) {
          fullMessages.push(attribute + ' ' + message);
        });
      });
      return fullMessages;
    };

})
