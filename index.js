document.addEventListener("DOMContentLoaded", function () {
  let botones = [
    document.getElementById("boton-1"),
    document.getElementById("boton-2"),
    document.getElementById("boton-3"),
    document.getElementById("boton-4"),
  ];
  let imagenes = [
    'url("./public/01-qrcodes.png")',
    'url("./public/02-profilemenu.png")',
    'url("./public/03-panaderia.png")',
    'url("./public/04-calendary.png")',
  ];
  let indiceActual = 0;
  let claseConFondo = document.querySelector(".contenedor-botones2");

  // Inicializa con el primer botón activo y fondo trasparente
  cambiarFondo(indiceActual, true); // Inicia sin retraso en la transición

  // Cambiar fondo cada 5 segundos
  setInterval(() => {
    indiceActual = (indiceActual + 1) % botones.length;
    cambiarFondo(indiceActual);
  }, 5500);

  // Agregar eventos de click a los botones
  botones.forEach((boton, indice) => {
    boton.addEventListener("click", function () {
      indiceActual = indice; // Actualiza el índice actual al índice del botón presionado
      cambiarFondo(indice);
    });
  });

  function cambiarFondo(indice, inicial = false) {
    // Solo reduce la opacidad si no es la carga inicial
    if (!inicial) {
      claseConFondo.style.opacity = "0";
    }

    // Cambia la imagen después de un breve retraso
    setTimeout(
      () => {
        botones.forEach((boton) => boton.classList.remove("boton-activo"));
        botones[indice].classList.add("boton-activo");
        claseConFondo.style.backgroundImage = imagenes[indice];

        // Añade un ligero retraso antes de restaurar la opacidad para permitir que la imagen cambie
        setTimeout(() => {
          claseConFondo.style.opacity = "1";
        }, 100); // Ajusta este tiempo si es necesario
      },
      inicial ? 0 : 850
    ); // Espera más tiempo si no es la carga inicial para una transición más suave
  }

});
//Page SERVICES

