// ==========================================
// 1. LÓGICA DEL CONTADOR EN TIEMPO REAL
// ==========================================
// Configura la fecha de la boda (Año, Mes - 1, Día, Hora, Minutos)
// Nota: En JS los meses van de 0 a 11 (Octubre = 9)
const fechaBoda = new Date(2026, 9, 24, 17, 0, 0).getTime();

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
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + horas : horas;
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

    