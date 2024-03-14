$(document).ready(function() {
    $('.men-digital, .qr-codes-personalizados').click(function() {
        // Elimina la clase "seleccionado" de todos los botones
        $('.men-digital, .qr-codes-personalizados').removeClass('seleccionado');
        
        // Agrega la clase "seleccionado" solo al botón que se hizo clic
        $(this).addClass('seleccionado');
    });
});