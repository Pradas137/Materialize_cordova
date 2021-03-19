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
    $('.collection:first-of-type').append('<li artistid="'+element["id"]+'" class="collection-item">'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></li>');
  }

  $('.secondary-content').click(function() {
    father = $(this).parent();
    Text = father.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var instancia = M.Tabs.getInstance(tabs);
    instancia.select("test-swipe-2");
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+father.attr("artistid"), // Artist ID on custom tag
      dataType: "json",
    }).done(function(msg){
        details(msg);
    }).fail(function(){
        alert("Error");
    });
  });

  function details(info) {
    $('.details').empty();
    $('<h1>'+info["name"]+'</h3>').appendTo('.details');
    $('<h2><b>Type:</b> '+info["type"]+'</h2>').appendTo('.details');
    $('<h2><b>Country:</b> '+info["area"]["sort-name"]+'</h2>').appendTo('.details');
    $('<h2><b>Life-span:</b> '+info["life-span"]["begin"]+' to '+info["life-span"]["end"]+'</h2>').appendTo('.details');
  }
}
}