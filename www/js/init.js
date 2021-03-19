document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    (function($){
  $(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });
  });
})(jQuery);

$("#searchbutton").click(function() {
  song = $('#searchbar').val();
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query="+song,
    dataType: "json",
  }).done(function(msg){
    showResults(msg);
  }).fail(function(){
    alert("Error");
  });
});

function showResults(result) {
  $('.collection:first-of-type').empty();
  var music = result["artists"];
  for (let index = 0; index < music.length; index++) {
    const element = music[index];
    $('.collection:first-of-type').append('<li id="'+element["id"]+'" class="collection-item">'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></li>');
  }

  $('.secondary-content').click(function() {
    data = $(this).parent();
    text = data.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var instancia = M.Tabs.getInstance(tabs);
    instancia.select("test-swipe-2");
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+data.attr("id"), // Artist ID on custom tag
      dataType: "json",
    }).done(function(msg){
        details(msg);
    }).fail(function(){
        alert("Error");
    });
  });

  function details(informacion) {
    $('#myTableId tbody').empty();
    $('<td>'+informacion["name"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["type"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["area"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["collection"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["recording"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["release"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["release-group"]+'</td>').appendTo('#myTableId tbody');
  }
}
}