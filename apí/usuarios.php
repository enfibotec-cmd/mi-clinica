<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

try {
    $stmt = $pdo->query(
        'SELECT id, nombre, email, creado_en
         FROM usuarios
         ORDER BY id DESC'
    );

    echo json_encode(
        [
            'ok' => true,
            'datos' => $stmt->fetchAll()
        ],
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        'ok' => false,
        'error' => 'Error interno del servidor'
    ]);
}
