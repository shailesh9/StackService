/**
 * Created by shailesh on 30/12/16.
 */
jQuery(document).ready(function ($) {

  function errResponse(error) {
    var resp = error.responseText;

    $('#post-stack').append(
      "<div class='row response'>" +
      "<p class='form-control-static input-lg text-danger text-center lead'>" +
      "<span class='glyphicon glyphicon-remove-sign'></span> "+
      "An error was encountered while operation.<br>" +
      "<code>" + resp + "</code>" +
      "</p>" +
      "</div>"
    );
  }
  $('#post-stack').on('submit', function (event) {
    event.preventDefault();
    event.returnValue = false;

    $.ajax({
      type: 'POST',
      url: '/push',
      data: {
        item: $('#stackItem').val()
      },
      dataType: 'json',
      success: function(response){
        if (response.length) {
          $(".table tbody").prepend('<tr id="stack-' + (response.length - 1) + '"><td>'+
            response[0] + '</td></tr>')
        }
        if ($('.view-stack').has("h3").length > 0) {
          $('.view-stack h3').text("Current Stack Size: "+ response.length);
        }
      },
      error: function(error){
        errResponse(error)
      }
    });

    $('#post-stack').trigger("reset");
  });

  $('#removeFromStack').on('click', function (event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/pop',
      dataType: 'json',
      success: function (response) {
        $(".table tr td:contains('" + response.item  + "')").remove();
        if ($('.view-stack').has("h3").length > 0) {
          $('.view-stack h3').text("Current Stack Size: "+ response.stack.length);
        }
      },
      error: function (error) {
        errResponse(error)
      }
    })
  });

  $('#viewStack').on('click', function (event) {
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/view',
      dataType: 'json',
      success: function (response) {
        if ($('.view-stack').has("h3").length > 0) {
          $('.view-stack h3').text("Current Stack size: "+ response.length);
        }else {
          $('.view-stack').append($("<h3>").text("Current Stack Size: "+ response.length))
        }
      },
      error: function (error) {
        errResponse(error)
      }
    })
  })
});