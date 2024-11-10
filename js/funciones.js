

document.addEventListener("DOMContentLoaded", function() {
    var idUsuario = getCookie("idUsuario");
    if (!idUsuario) {
        window.location.href = 'index.html'; // Redirige a la página de inicio de sesión si no hay cookie
    } else {
        obtenerDatosUsuario(idUsuario);
    }
});

function obtenerDatosUsuario(idUsuario) {
    fetch('php/obtenerDatosUsuario.php?idUsuario=' + idUsuario)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                var usuario = data.usuario;
                document.getElementById("userId").textContent = usuario.id_usuario;
                document.getElementById("userName").textContent = usuario.usuario;
                document.getElementById("userLevel").textContent = usuario.nivel;
                document.getElementById("userTeam").textContent = usuario.preferencia_equipo;
                mostrarInfoEquipo(usuario.preferencia_equipo); // Llama a mostrarInfoEquipo con el nombre del equipo preferido
                obtenerJugadoresEquipo(usuario.preferencia_equipo); // Llama a obtenerJugadoresEquipo con el nombre del equipo preferido
                obtenerIdEquipo(usuario.preferencia_equipo); // Llama a obtenerIdEquipo con el nombre del equipo preferido
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de usuario:', error);
        });
}

function mostrarInfoEquipo(nombreEquipo) {
    // URL de la API con el nombre del equipo como parámetro
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/275841/searchteams.php?t=${nombreEquipo}`;
    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Obtener la información del equipo
            const equipo = data.teams[0];

            // Crear el HTML para mostrar la información del equipo
            const infoEquipoHTML = `
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Nombre del Equipo</th>
                            <td>${equipo.strTeam}</td>
                        </tr>
                        <tr>
                            <th>Estadio</th>
                            <td>${equipo.strStadium}</td>
                        </tr>
                        <tr>
                            <th>País</th>
                            <td>${equipo.strCountry}</td>
                        </tr>
                        <tr>
                            <th>Web</th>
                            <td><a href="${equipo.strWebsite}" target="_blank">${equipo.strWebsite}</a></td>
                        </tr>
                        <tr>
                            <th>Descripción</th>
                            <td>${equipo.strDescriptionEN}</td>
                        </tr>
                        <tr>
                            <th>Logo del Equipo</th>
                            <td><img src="${equipo.strTeamBadge}" alt="${equipo.strTeam}" width="100"></td>
                        </tr>
                    </tbody>
                </table>
            `;

            // Mostrar la información del equipo en el div "info-equipo"
            document.getElementById('info-equipo').innerHTML = infoEquipoHTML;
        })
        .catch(error => {
            console.error('Error al cargar la información del equipo:', error);
        });
}

function obtenerJugadoresEquipo(nombreEquipo) {
// URL de la API con el nombre del equipo como parámetro
const apiUrl = `https://www.thesportsdb.com/api/v1/json/275841/searchplayers.php?t=${nombreEquipo}`;
// Realizar la solicitud a la API
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    // Obtener la lista de jugadores
    const jugadores = data.player;

    // Crear el HTML para mostrar la lista de jugadores
    let jugadoresHTML = '<h2>Jugadores del Equipo</h2><ul class="jugadores-lista">';
    jugadores.forEach((jugador, index) => {
        // Obtener la URL de la imagen del jugador
        const imagenJugador = jugador.strThumb || 'https://via.placeholder.com/150'; // En caso de que no haya imagen, se muestra un placeholder
        jugadoresHTML += `
            <li style="padding:10px;">
                <img src="${imagenJugador}" alt="${jugador.strPlayer}" style="width: 100px; height: auto;">
                <a style="color:black;" href="#" onclick="obtenerInfoJugador(${jugador.idPlayer})">${jugador.strPlayer}</a>
            </li>`;
        // Agregar un salto de línea cada 5 jugadores
        if ((index + 1) % 4 === 0) {
            jugadoresHTML += '<br>';
        }
    });
    jugadoresHTML += '</ul>';

    // Mostrar la lista de jugadores en el div "info-jugadores"
    document.getElementById('info-jugadores').innerHTML = jugadoresHTML;
})
.catch(error => {
    console.error('Error al cargar la lista de jugadores:', error);
});
}


function obtenerInfoJugador(idJugador) {
    // URL de la API con el ID del jugador como parámetro
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/275841/lookupplayer.php?id=${idJugador}`;
    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene la propiedad "players"
            if (data.players) {
                // Obtener la información del jugador
                const jugador = data.players[0];

                // Obtener la URL de la imagen del jugador
                const imagenJugador = jugador.strThumb || 'https://via.placeholder.com/150'; // En caso de que no haya imagen, se muestra un placeholder

                // Crear el HTML para mostrar la información del jugador
                const jugadorInfoHTML = `
                    <h2>Información del Jugador</h2>
                    <div>
                        <img src="${imagenJugador}" alt="${jugador.strPlayer}" style="width: 200px; height: auto;">
                    </div>
                    <ul>
                        <li>Nombre: ${jugador.strPlayer}</li>
                        <li>Posición: ${jugador.strPosition}</li>
                        <li>Número de camiseta: ${jugador.strNumber}</li>
                        <li>Nacionalidad: ${jugador.strNationality}</li>
                        <li>Fecha de nacimiento: ${jugador.dateBorn}</li>
                        <li>Lugar de nacimiento: ${jugador.strBirthLocation}</li>
                    </ul>
                `;

                // Mostrar la información del jugador en el div "info-jugadores"
                document.getElementById('info-jugadores').innerHTML = jugadorInfoHTML;
            } else {
                // Manejar el caso en el que no se encontró información del jugador
                console.error('No se encontró información del jugador:', data);
            }
        })
        .catch(error => {
            console.error('Error al cargar la información del jugador:', error);
        });
}

function obtenerIdEquipo(nombreEquipo) {
    fetch(`https://www.thesportsdb.com/api/v1/json/275841/searchteams.php?t=${nombreEquipo}`)
        .then(response => response.json())
        .then(data => {
            if (data.teams && data.teams.length > 0) {
                const equipo = data.teams[0];
                obtenerProximosEventos(equipo.idTeam); // Llama a obtenerProximosEventos con el ID del equipo
                obtenerUltimosPartidos(equipo.idTeam); // Llama a obtenerUltimosPartidos con el ID del equipo
            } else {
                console.error('No se encontró el equipo:', nombreEquipo);
            }
        })
        .catch(error => {
            console.error('Error al obtener el ID del equipo:', error);
        });
}

function obtenerProximosEventos(idEquipo) {
    // URL de la API con el ID del equipo como parámetro
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/275841/eventsnext.php?id=${idEquipo}`;
    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene la propiedad "events" y si es un array
            if (data.events && Array.isArray(data.events)) {
                // Obtener la lista de eventos
                const eventos = data.events;

                // Verificar si la lista de eventos está vacía
                if (eventos.length === 0) {
                    document.getElementById('info-eventos').innerHTML = '<p>No hay eventos próximos para este equipo.</p>';
                } else {
                    // Crear el HTML para mostrar la lista de eventos
                    let eventosHTML = '<h2></h2>';
                    eventos.forEach(evento => {
                        eventosHTML += `
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">${evento.strEvent}</h5>
                                    <p class="card-text">Fecha: ${evento.dateEvent}</p>
                                    <p class="card-text">Hora: ${evento.strTime}</p>
                                    <p class="card-text">Lugar: ${evento.strVenue}</p>
                                    <p class="card-text">Tipo: ${evento.strSport}</p>
                                </div>
                            </div>
                        `;
                    });

                    // Mostrar la lista de eventos en el div "info-eventos"
                    document.getElementById('info-eventos').innerHTML = eventosHTML;
                }
            } else {
                // Manejar el caso en el que la respuesta de la API no contiene la propiedad "events" o no es un array
                console.error('La respuesta de la API no contiene la propiedad "events" o no es un array:', data);
            }
        })
        .catch(error => {
            console.error('Error al cargar la lista de eventos:', error);
        });
}

function obtenerUltimosPartidos(idEquipo) {
    // URL de la API con el ID del equipo como parámetro
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/275841/eventslast.php?id=${idEquipo}`;
    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Verificar si la respuesta contiene la propiedad "results" y si es un array
            if (data.results && Array.isArray(data.results)) {
                // Obtener los últimos 3 partidos
                const ultimosPartidos = data.results.slice(0, 3);

                // Crear el HTML para mostrar la información de los últimos 3 partidos
                let ultimosPartidosHTML = '';
                ultimosPartidos.forEach(partido => {
                    ultimosPartidosHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Partido</h5>
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Equipo Local</th>
                                            <td>${partido.strHomeTeam}</td>
                                        </tr>
                                        <tr>
                                            <th>Equipo Visitante</th>
                                            <td>${partido.strAwayTeam}</td>
                                        </tr>
                                        <tr>
                                            <th>Resultado</th>
                                            <td>${partido.intHomeScore} - ${partido.intAwayScore}</td>
                                        </tr>
                                        <tr>
                                            <th>Fecha</th>
                                            <td>${partido.dateEvent}</td>
                                        </tr>
                                        <tr>
                                            <th>Hora</th>
                                            <td>${partido.strTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                });

                // Mostrar la información de los últimos 3 partidos en el div "info-ultimos-partidos"
                document.getElementById('info-ultimos-partidos').innerHTML = ultimosPartidosHTML;
            } else {
                // Manejar el caso en el que la respuesta de la API no contiene la propiedad "results" o no es un array
                console.error('La respuesta de la API no contiene la propiedad "results" o no es un array:', data);
            }
        })
        .catch(error => {
            console.error('Error al cargar la información de los últimos partidos:', error);
        });
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
