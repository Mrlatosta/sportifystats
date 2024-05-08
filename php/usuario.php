<?php
include('conexion.php');

function registrarUsuario($usuario, $contrasena, $nivel, $equipo) {
    global $pdo;

    try {
        $estado = 1;
        $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuario (usuario, contrasena, nivel, estado, preferencia_equipo) VALUES (:usuario, :contrasena, :nivel, :estado, :equipo)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
        $stmt->bindParam(':contrasena', $hashed_password, PDO::PARAM_STR);
        $stmt->bindParam(':nivel', $nivel, PDO::PARAM_INT);
        $stmt->bindParam(':estado', $estado, PDO::PARAM_INT);
        $stmt->bindParam(':equipo', $equipo, PDO::PARAM_STR);

        $stmt->execute();

        return array('success' => true, 'ultimo_id_insertado' => $pdo->lastInsertId());
    } catch (PDOException $e) {
        return array('success' => false, 'message' => 'Error al ejecutar la consulta: ' . $e->getMessage());
    }
}

// Lógica de presentación
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos = json_decode(file_get_contents("php://input"), true);

    if (isset($datos['usuario'], $datos['contrasena'], $datos['nivel'], $datos['equipo'])) {
        $resultado = registrarUsuario($datos['usuario'], $datos['contrasena'], $datos['nivel'], $datos['equipo']);
        echo json_encode($resultado);
    } else {
        echo json_encode(array('success' => false, 'message' => 'Faltan Campos Obligatorios'));
    }
}
?>
