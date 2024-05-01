
    function iniciarSesion() {
        // Obtener los valores del formulario
        var username = document.getElementById("user");
        var password = document.getElementById("contrasena");
    
        // Crear objeto FormData con los datos del formulario
        var formData = new FormData();
        formData.append('user', username.value);
        formData.append('pswd', password.value);
    
        // Realizar la solicitud POST al archivo PHP
        fetch('php/inicioSesion.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Verificar el resultado de la respuesta JSON
            if (data.estatusSesion === 1) {
                // Inicio de sesión exitoso, redireccionar al usuario a index.html
                window.location.href = 'principal.html';
            } else {
                // Mostrar mensaje de error al usuario
                alert(data.txt);
    
                // Cambiar el color del recuadro del usuario y/o contraseña a rojo
                if (data.txt.includes("Usuario")) {
                    username.classList.add("input-error");
                    // Activar el tooltip
                    $(username).tooltip('show');
                }
                if (data.txt.includes("Contraseña")) {
                    password.classList.add("input-error");
                    // Activar el tooltip
                    $(password).tooltip('show');
                }
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
        });
    }
    


function togglePasswordVisibility() {
    var passwordInput = document.getElementById("contrasena");
    var toggleButton = document.getElementById("togglePasswordBtn");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Ocultar";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Mostrar";
    }
}
function cerrarSesion() {
    // Eliminar cookie de sesión
    document.cookie = "idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirige a la página de inicio de sesión
    window.location.href = 'index.html';
}