let newsToken = null;

document.addEventListener('DOMContentLoaded', function() {
    var botonAbrir = document.getElementById('abrir');
    var menuMovil = document.getElementById('menuMovil');

    // Función para alternar la visibilidad del nuevo menú móvil
    botonAbrir.addEventListener('click', function() { 
        if (menuMovil.style.display === 'none' || menuMovil.style.display === '') {
            menuMovil.style.display = 'block';
        } else {
            menuMovil.style.display = 'none';
        }
    });
});


//END MENU MOVIL

document.addEventListener("DOMContentLoaded", function () {
    let botones = [
        document.getElementById("boton-1"),
        document.getElementById("boton-2"),
        document.getElementById("boton-3"),
        document.getElementById("boton-4"),
    ];
    let imagenes = [
        'url("imgs/imgsvg/home-1-qr.svg")',
        'url("imgs/imgsvg/home-2-celulares.svg")',
        'url("imgs/imgsvg/home-3-celular.svg")',
        'url("imgs/imgsvg/home-4-calendary.svg")',
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
function toggleSwitch(clickedButton) {
    //console.log("que esta pasando");
    //variables para SERVICIOS
    let restaurantesButton = document.getElementById("restaurantesButton");
    let otrosButton = document.getElementById("otrosButton");

    // Cambiar el estado activo de los botones
    restaurantesButton.classList.toggle("active");
    otrosButton.classList.toggle("active");
    // Cambiar el fondo activo según el botón activo
    if (restaurantesButton.classList.contains("active")) {
        otrosButton.style.background = "transparent"; // Otros inactivo
        restaurantesButton.style.background =
            "linear-gradient(269.92deg, #e83e8c, #6f42c1)"; // Restaurantes activo
        $(".v1").css("display","block");
        $(".v2").css("display","none");
    } else {
        restaurantesButton.style.background = "transparent"; // Restaurantes inactivo
        otrosButton.style.background =
            "linear-gradient(269.92deg, #e83e8c, #6f42c1)"; // Otros activo
        $(".v2").css("display","block");
        $(".v1").css("display","none");
    }
}
$(document).ready(function () {
    var maxWidthForMobile = 768;
    function isMobileScreen() {
        return window.matchMedia("(max-width: " + maxWidthForMobile + "px)").matches;
    }

    $(".servicios_div").on('click', function(){
        if(isMobileScreen()) {
            $(".tree-structure").slideToggle();
        }
    });

    $(".campo-busqueda").on('input', function() {
        var val=$(this).val().toUpperCase();
        $(".nombre").each(function() {
            if ($(this).text().toUpperCase().indexOf(val) > -1) {
                $(this).parent().parent().parent().css('display', 'flex');
            } else {
                $(this).parent().parent().parent().css('display', 'none');
            }
        });
    });

    var app = angular
        .module("unifyConsoleHeader", [])
        /***/.factory("envio", function ($http) {
            let factory = {};
            factory.data = {};

            factory.envioMail = function(data) {
                console.log("estoy aca");
                return $http.post("/" + $("#site_prefix").val() + "/envio", data);
            };
            return factory;
        })/*****/
        .controller("unifyConsoleHeaderCtrl", function ($scope, $http, $filter, envio) {

            $scope.moment = moment;
            $scope.mensajes = [];
            $scope.notificaciones = [];

           /****/ $scope.envio_mail = function (e) {
                e.preventDefault(); // Esto es correcto si estás dentro de un <form>
                console.log("Función envio_mail ejecutada"); // Verifica si esto se muestra en la consola

                // Asegúrate de que $scope.paramsReserve esté definido
                console.log($scope.paramsReserve); // Revisa si paramsReserve está definido

                envio.envioMail($scope.paramsReserve).then(function (resp) {
                    console.log("Respuesta recibida", resp);
                    // Lógica basada en la respuesta
                }, function (error) {
                    console.error("Error en envioMail", error);
                });
            };/****/

            $scope.qtyUnreadMessages = function () {
                return $filter("filter")($scope.mensajes, {IN_READ: "N"}).length;
            };
            $scope.readMessage = function (idx) {
                $scope.mensajes[idx].IN_READ = "Y";
                // Todo: Send to messages page
            };
            $scope.qtyUnreadNotifications = function () {
                return $filter("filter")($scope.notificaciones, {IN_READ: "N"})
                    .length;
            };
            $scope.showUserProfile = function (e) {
                e.preventDefault();
                let l = Ladda.create(e.currentTarget);
                l.start();
                $http
                    .get("/" + $("#site_prefix").val() + "aligera/admin/perfil_usuario")
                    .then(
                        function (resp) {
                            if (resp.data) {
                                bootbox
                                    .dialog({
                                        title: "Perfil de Usuario",
                                        message: resp.data,
                                        show: false,
                                        size: "large",
                                        buttons: {
                                            cancel: {label: "Cancel"},
                                            save: {
                                                className: "btn btn-primary saveBtn",
                                                label: "<i class='hs-admin-save mr-1'></i>Save",
                                                callback: function () {
                                                    let l = Ladda.create($(".saveBtn", this)[0]);
                                                    l.start();
                                                    $("#perfilUsuarioForm")
                                                        .getAngularScope()
                                                        .saveProfile()
                                                        .then(
                                                            function () {
                                                                $("#perfilUsuarioForm").hideDialog();
                                                                l.stop();
                                                            },
                                                            function () {
                                                                l.stop();
                                                            }
                                                        );
                                                    return false;
                                                },
                                            },
                                        },
                                    })
                                    .on("shown.bs.modal", function () {
                                        l.stop();
                                    })
                                    .modal("show");
                            } else {
                                l.stop();
                                toastr.error(
                                    "Se produjo un error desconocido al cargar el perfil de usuario",
                                    "Error"
                                );
                            }
                        },
                        function () {
                            l.stop();
                            toastr.error(
                                "Se produjo un error desconocido al cargar el perfil de usuario",
                                "Error"
                            );
                        }
                    );

                return false;
            };

            $scope.logout = function () {
                let loginUrl = new URI("/" + $("#site_prefix").val() + "logout");
                window.location.href = loginUrl.resource();
            };

            $scope.changePass = function () {
                let loginUrl = new URI(
                    "/" + $("#site_prefix").val() + "console/password/change"
                ).search({refer: new URI().resource()});
                window.location.href = loginUrl.resource();
            };

            $scope.switchRole = function (id, nb) {
                $("body > .loading-container").removeClass("loading-inactive");
                createCookie("ID_SYSTEM_ROLES", id, 30);
                createCookie("NB_ROLE", nb, 30);

                let consoleURL = new URI("/" + $("#site_prefix").val() + "console");
                window.location.href = consoleURL.resource();
            };
        });
    appManager.startApp("#header", ["unifyConsoleHeader"]);

    $(document).on("click","#contact", function (e) {
        e.preventDefault();
        bootbox.dialog({
            show: false,
            title: "Contacto",
            message: $("#contact-modal").html(),
            buttons: {},
            backdrop: true,
            centerVertical: true,
        }).on("show.bs.modal", function () {
            $(this).find(".modal-header").remove();
            $(this).find(".modal-content").css({
                border: "none",
                background: "transparent"
            });
        }).on("shown.bs.modal", function () {
            let that = this;
            setTimeout(function (){
                $(that).find(".flip-container").addClass("hover");
            }, 250)
        }).modal("show");
});
});

/*$("#contact").click(function (e) {
    e.preventDefault();
  bootbox.alert({
    title: "Contacto",
    message: $("#contact-modal").html(),
  });
});*/

$("#newsletterFrm").submit(function (e) {
    e.preventDefault();

    if (newsToken) {
        let l = Ladda.create(
            $("form[name='newsletterFrm'] button[type='submit']").addClass(
                "ladda-button"
            )[0]
        );
        l.start();

        $.post(
            Agora.sitePrefix("waitinglist"),
            $(this).getSerializeObject(),
            function (resp) {
                if (resp.success) {
                    toastr.success(resp.message);
                } else {
                    toastr.error(resp.message);
                }
                l.stop();
                newsToken = null;
                setTimeout(function () {
                    grecaptcha.reset();
                }, 500);
            },
            "json"
        ).fail(function () {
            l.stop();
            newsToken = null;
            setTimeout(function () {
                grecaptcha.reset();
            }, 500);
        });
    } else {
        grecaptcha.execute();
    }
});

$(document).ready(function () {
    // Carousel Function
    $("#carousel5").on("click", ".js-thumb", function (e) {
        e.stopPropagation();

        let i = $(this).data("slick-index");

        if ($("#carousel5").slick("slickCurrentSlide") !== i) {
            $("#carousel5").slick("slickGoTo", i);
        }
    });

    // Initialization of Carousel
    /*$('#carousel5').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 5000,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });*/
});

function processRecaptchaToken(resp) {
    newsToken = resp;
    $("form[name='newsletterFrm']").submit();
}

$(document).on("ready", function () {
    // initialization of carousel
    //$.HSCore.components.HSCarousel.init('.js-carousel');

    // initialization of header
    $.HSCore.components.HSHeader.init($("#js-header"));
    $.HSCore.helpers.HSHamburgers.init(".hamburger");

    // initialization of tabs
    $.HSCore.components.HSTabs.init('[role="tablist"]');

    // initialization of scroll animation
    $.HSCore.components.HSOnScrollAnimation.init("[data-animation]");

    // initialization of go to section
    $.HSCore.components.HSGoTo.init(".js-go-to");

    // initialization of popups
    $.HSCore.components.HSPopup.init(".js-fancybox-media", {
        helpers: {
            media: {},
            overlay: {
                css: {
                    background: "rgba(255, 255, 255, .8)",
                },
            },
        },
    });
});

$(window).on("load", function () {
    // initialization of HSScrollNav
    $.HSCore.components.HSScrollNav.init($("#js-scroll-nav"), {
        duration: 700,
    });
});

$(window).on("resize", function () {
    setTimeout(function () {
        $.HSCore.components.HSTabs.init('[role="tablist"]');
    }, 200);
});

//elimina logo al ir bajando
window.addEventListener('scroll', function() {
    const header = document.querySelector('.cabecera');
    const logo = document.querySelector('.logo1 img');


    if (window.scrollY > 50) { // Cambia el número según sea necesario
        header.classList.add('scroll-down');
        logo.style.opacity = '0'; // Cambia la opacidad del logo
    } else {
        header.classList.remove('scroll-down');
        logo.style.opacity = '1'; // Restaura la opacidad del logo
    }
});
//ELIMINAR LOG IN
window.addEventListener('scroll', function() {
    var miDiv = document.getElementById('miDiv');

    if (window.scrollY > 50) { // Cambia el número según sea necesario
        miDiv.classList.add('oculto');
    } else {
        miDiv.classList.remove('oculto');
    }
});


// NAVBAR RESPONSIVE

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

//NAVBAR DESAPARECE AL BAJAR Y APARECE AL SUBIR UN POCO

let lastScrollTop = 0;

window.addEventListener("scroll", function(){
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop){
        // Desplazamiento hacia abajo
        document.getElementById("nav").classList.add("hidden");
    } else {
        // Desplazamiento hacia arriba
        document.getElementById("nav").classList.remove("hidden");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});