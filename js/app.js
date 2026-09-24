'use strict';

const listaUsuarios = document.getElementById('listaUsuarios');
const estado = document.getElementById('estado');
const btnRecargar = document.getElementById('btnRecargar');

async function cargarUsuarios() {
    mostrarEstado('Cargando usuarios...');

    try {
        const respuesta = await fetch('./api/usuarios.php', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const resultado = await respuesta.json();

        if (!resultado.ok || !Array.isArray(resultado.datos)) {
            throw new Error('Respuesta de API inválida');
        }

        mostrarUsuarios(resultado.datos);

        mostrarEstado(
            `${resultado.datos.length} usuario(s) encontrado(s).`
        );

    } catch (error) {
        console.error('Error:', error);

        listaUsuarios.replaceChildren();

        mostrarEstado(
            'No se pudieron cargar los usuarios.'
        );
    }
}

function mostrarUsuarios(usuarios) {
    listaUsuarios.replaceChildren();

    if (usuarios.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay usuarios registrados.';
        listaUsuarios.appendChild(mensaje);
        return;
    }

    const lista = document.createElement('ul');

    usuarios.forEach(usuario => {
        const elemento = document.createElement('li');

        const nombre = document.createElement('strong');
        nombre.textContent = usuario.nombre;

        const email = document.createElement('span');
        email.textContent = ` — ${usuario.email}`;

        elemento.append(nombre, email);
        lista.appendChild(elemento);
    });

    listaUsuarios.appendChild(lista);
}

function mostrarEstado(mensaje) {
    estado.textContent = mensaje;
}

btnRecargar.addEventListener('click', cargarUsuarios);

cargarUsuarios();
