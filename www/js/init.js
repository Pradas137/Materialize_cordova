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
    varParent = $(this).parent();
    parentText = varParent.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var tabsInstance = M.Tabs.getInstance(tabs);
    tabsInstance.select("test-swipe-2");
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+varParent.attr("artistid"), // Artist ID on custom tag
      dataType: "json",
    }).done(function(msg){
      showDetails(msg);
    }).fail(function(){
      alert("Ajax Error");
    });
  });
}
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

}