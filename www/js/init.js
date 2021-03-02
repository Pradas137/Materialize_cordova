// Arxiu init.js + index.js
 
(function($){
  $(function(){
 
    $('.sidenav').sidenav();
    $('.tabs').tabs({"swipeable": true, "responsiveThreshold": Infinity});
 
  }); // end of document ready
})(jQuery); // end of jQuery name space
 
 
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}