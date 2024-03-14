document.addEventListener('DOMContentLoaded', function() {
    var textoCambiarFondo = document.getElementById('boton-1');
    var textoCambiarFondo2 = document.getElementById('boton-2');
    var textoCambiarFondo3 = document.getElementById('boton-3');
    var textoCambiarFondo4 = document.getElementById('boton-4');
    var claseConFondo = document.querySelector('.uncle-thrice-removed-nodes');

    textoCambiarFondo.addEventListener('click', function() {
        // Cambiar el fondo de la clase
        claseConFondo.style.backgroundImage = 'url("./public/qrcodespersonalizadoslandingpage.png")';
    });

    textoCambiarFondo2.addEventListener('click', function() {
        // Cambiar el fondo de la clase
        claseConFondo.style.backgroundImage = 'url("./public/ProfileMenuReservaciones.png")';
    });

    textoCambiarFondo3.addEventListener('click', function() {
        // Cambiar el fondo de la clase
        claseConFondo.style.backgroundImage = 'url("./public/landingpanaderia-1@2x.png")';
    });

    textoCambiarFondo4.addEventListener('click', function() {
        // Cambiar el fondo de la clase
        claseConFondo.style.backgroundImage = 'url("./public/calendario.png")';
    });

});
