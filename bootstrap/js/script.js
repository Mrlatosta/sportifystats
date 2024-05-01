document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#formulario-contacto');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 
        mostrarMensajeAgradecimiento();
    });

    function mostrarMensajeAgradecimiento() {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'Gracias por mandar tu información';

        formulario.appendChild(mensaje);
    }
});
