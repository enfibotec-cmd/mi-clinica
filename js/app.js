async function cargarUsuarios() {
    try {
        const respuesta = await fetch('./api/datos.php');

        if (!respuesta.ok) {
            throw new Error('Error HTTP ' + respuesta.status);
        }

        const resultado = await respuesta.json();

        console.log(resultado);

    } catch (error) {
        console.error('No se pudieron cargar los usuarios:', error);
    }
}

cargarUsuarios();
