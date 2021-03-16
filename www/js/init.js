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

    (function($){
        $(function(){
            $('.sidenav').sidenav();
            $('.fixed-action-btn').floatingActionButton();
              // els tabs necessiten ser swipeable
              //$('.tabs').tabs({"swipeable":true});

                var options = { "swipeable": true };
                var el = document.getElementById('tabs-swipe-demo');
                var tabsInstance = M.Tabs.init(el, options);
                // make clicable an element of the list and go to the next tab

            $('#list').click(function() {
                tabsInstance.select("test-swipe-2");
            });

        }); // end of document ready
    })(jQuery); // end of jQuery name space

}
 
