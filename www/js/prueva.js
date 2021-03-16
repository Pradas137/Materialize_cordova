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

function cargarMusica(){
    $.ajax({
        type: 'GET',
        url: 'https://musicbrainz.org/doc/MusicBrainz_API',
        success: function(res){
            let select = $('select')
            select.html('')
            let obj = res

            obj.regiones.forEach((elemento, indice) => {
                select.append(`
                    <option value="${indice}">${elemento.nombre}</option>
                `)

            });
            $('select').trigger('change');
        },
        error: function(res){
            let error = res.responseJSON.mensaje
            console.log(error)
        }
    })
} 
