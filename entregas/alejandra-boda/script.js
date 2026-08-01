// ==========================================
// 1. LÓGICA DEL CONTADOR EN TIEMPO REAL
// ==========================================
// Configura la fecha de la boda (Año, Mes - 1, Día, Hora, Minutos)
// Nota: En JS los meses van de 0 a 11 (Octubre = 9)
const fechaBoda = new Date(2026, 7, 15, 12, 0, 0).getTime();

const contador = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Validamos que los elementos existan en el DOM antes de asignarles texto
    if(document.getElementById("days")) {
        document.getElementById("days").innerHTML = dias < 10 ? "0" + dias : dias;
        document.getElementById("hours").innerHTML = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutes").innerHTML = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("seconds").innerHTML = segundos < 10 ? "0" + segundos : segundos;
    }

    if (distancia < 0) {
        clearInterval(contador);
        const timerContainer = document.querySelector(".timer");
        if(timerContainer) {
            timerContainer.innerHTML = "<h3>¡Hoy es el gran día!</h3>";
        }
    }
}, 1000);


// ==========================================
// 2. LÓGICA DE LA MÚSICA DE FONDO (CON ICONOS CLÁSICOS)
// ==========================================
function controlarMusica() {
    const musica = document.getElementById("musica-boda");
    const btnMusica = document.getElementById("btn-musica");
    
    if(!musica || !btnMusica) return;

    const iconoMusica = btnMusica.querySelector("i");

    if (musica.paused) {
        musica.play().catch(error => {
            console.log("El navegador bloqueó el inicio automático.");
        });
        // Si la música está sonando, muestra el icono de volumen alto
        iconoMusica.className = "fa-solid fa-volume-high";
        btnMusica.style.background = "var(--oro)";
        iconoMusica.style.color = "white";
    } else {
        musica.pause();
        // Si se pausa, muestra el icono de volumen muteado
        iconoMusica.className = "fa-solid fa-volume-xmark";
        btnMusica.style.background = "";
        iconoMusica.style.color = "";
    }
}


// ==========================================
// 3. LÓGICA DEL MODO OSCURO (CON ICONOS CLÁSICOS)
// ==========================================
function controlarModoOscuro() {
    const btnOscuro = document.getElementById("btn-oscuro");
    if(!btnOscuro) return;

    const iconoOscuro = btnOscuro.querySelector("i");

    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
        // En modo oscuro, muestra un sol regular
        iconoOscuro.className = "fa-regular fa-sun";
    } else {
        // En modo claro, regresa a la luna regular
        iconoOscuro.className = "fa-regular fa-moon";
    }
}


// ==========================================
// 4. LÓGICA DE LA GALERÍA INTERACTIVA (LIGHTBOX)
// ==========================================
function abrirImagen(rutaImagen) {
    const lightbox = document.getElementById("lightbox");
    const imgLightbox = document.getElementById("img-lightbox");
    
    if(!lightbox || !imgLightbox) return;

    imgLightbox.src = rutaImagen;
    lightbox.style.display = "flex";
    
    // Pequeño retraso para que la animación CSS se ejecute suavemente
    setTimeout(() => {
        lightbox.style.opacity = "1";
        imgLightbox.style.transform = "scale(1)";
    }, 10);
}

function cerrarImagen() {
    const lightbox = document.getElementById("lightbox");
    const imgLightbox = document.getElementById("img-lightbox");
    
    if(!lightbox || !imgLightbox) return;

    lightbox.style.opacity = "0";
    imgLightbox.style.transform = "scale(0.9)";
    
    // Esperamos a que termine la animación de desvanecimiento para ocultarlo por completo
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 400);
}











// ==========================================
// 5. LÓGICA DE MESA DE REGALOS (COPIAR CLABE CON TOAST)
// ==========================================
function copiarClabe() {
    // Obtenemos el texto de la cuenta CLABE
    const clabeTexto = document.getElementById("clabe-numero").innerText;

    // API de portapapeles nativa del navegador
    navigator.clipboard.writeText(clabeTexto).then(() => {
        const toast = document.getElementById("toast-aviso");
        if(!toast) return;

        // Mostramos el aviso flotante
        toast.className = "toast-oculto toast-visible";

        // Lo ocultamos automáticamente después de 3 segundos
        setTimeout(function() {
            toast.className = "toast-oculto";
        }, 3000);
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
}


// ==========================================
// 6. TEXTOS Y TARJETAS QUE APARECEN AL HACER SCROLL
// ==========================================
function iniciarScrollReveal() {
    const elementos = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!elementos.length) return;

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("in-view");
                observador.unobserve(entrada.target); // Solo se anima una vez
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    });

    elementos.forEach(el => observador.observe(el));
}


// ==========================================
// 7. CARRUSEL DE GALERÍA (con puntos, flechas y deslizamiento táctil)
// ==========================================
let carruselIndice = 0;
let carruselTotal = 0;

function iniciarCarrusel() {
    const pista = document.getElementById("carrusel-pista");
    const contenedorPuntos = document.getElementById("carrusel-puntos");
    if (!pista || !contenedorPuntos) return;

    const slides = pista.querySelectorAll(".carrusel-slide");
    carruselTotal = slides.length;
    if (carruselTotal === 0) return;

    // Genera los puntos indicadores dinámicamente
    contenedorPuntos.innerHTML = "";
    slides.forEach((_, i) => {
        const punto = document.createElement("button");
        punto.className = "carrusel-punto" + (i === 0 ? " activo" : "");
        punto.setAttribute("aria-label", "Ir a la foto " + (i + 1));
        punto.addEventListener("click", () => irASlide(i));
        contenedorPuntos.appendChild(punto);
    });

    actualizarCarrusel();

    // Soporte para deslizar con el dedo en móviles
    let inicioX = 0;
    pista.addEventListener("touchstart", (e) => {
        inicioX = e.touches[0].clientX;
    }, { passive: true });

    pista.addEventListener("touchend", (e) => {
        const finX = e.changedTouches[0].clientX;
        const diferencia = inicioX - finX;
        if (Math.abs(diferencia) > 40) {
            moverCarrusel(diferencia > 0 ? 1 : -1);
        }
    }, { passive: true });
}

function actualizarCarrusel() {
    const pista = document.getElementById("carrusel-pista");
    const puntos = document.querySelectorAll(".carrusel-punto");
    if (!pista) return;

    pista.style.transform = `translateX(-${carruselIndice * 100}%)`;

    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === carruselIndice);
    });
}

function moverCarrusel(direccion) {
    carruselIndice = (carruselIndice + direccion + carruselTotal) % carruselTotal;
    actualizarCarrusel();
}

function irASlide(indice) {
    carruselIndice = indice;
    actualizarCarrusel();
}


// ==========================================
// 8. DESTELLOS AMBIENTALES EN LA PORTADA (HERO)
// ==========================================
function generarDestellos() {
    const campo = document.getElementById("sparkle-field");
    if (!campo) return;

    const cantidad = 18;
    for (let i = 0; i < cantidad; i++) {
        const destello = document.createElement("span");
        destello.className = "sparkle";
        destello.style.left = Math.random() * 100 + "%";
        destello.style.top = Math.random() * 100 + "%";
        destello.style.animationDelay = (Math.random() * 5) + "s";
        destello.style.animationDuration = (3.5 + Math.random() * 3) + "s";
        const tamano = 4 + Math.random() * 5;
        destello.style.width = tamano + "px";
        destello.style.height = tamano + "px";
        campo.appendChild(destello);
    }
}


// ==========================================
// 9. INICIALIZACIÓN GENERAL AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    iniciarScrollReveal();
    iniciarCarrusel();
    generarDestellos();
});

    
