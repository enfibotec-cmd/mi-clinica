<?php
// 1. Conectarse a la base de datos
 $conn = new mysqli("localhost", "root", "", "clinica_dental");

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// 2. Recibir los datos del formulario
 $nombre   = $_POST['nombre'];
 $correo   = $_POST['correo'];
 $telefono = $_POST['telefono'];
 $servicio = $_POST['servicio'];
 $fecha    = $_POST['fecha'];
 $hora     = $_POST['hora'];

// 3. Guardar en la base de datos (de forma segura)
 $stmt = $conn->prepare("INSERT INTO citas (nombre, correo, telefono, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)");
 $stmt->bind_param("ssssss", $nombre, $correo, $telefono, $servicio, $fecha, $hora);

// 4. Mostrar confirmación
if ($stmt->execute()) {
    echo "<h1>✅ ¡Cita agendada con éxito!</h1>";
    echo "<p><b>$nombre</b>, tu cita de <b>$servicio</b> quedó registrada para el <b>$fecha</b> a las <b>$hora</b>.</p>";
    echo "<p>Te contactaremos para confirmar. ¡Gracias!</p>";
    echo "<a href='formulario.html'>← Volver</a>";
} else {
    echo "❌ Error al guardar: " . $stmt->error;
}

 $stmt->close();
 $conn->close();
?>
