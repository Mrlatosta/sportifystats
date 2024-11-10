<?php
header('Content-Type: application/json; charset=UTF-8');
include('conexion.php');

try {
    if (isset($_POST['usuario'], $_POST['contrasena'], $_POST['nivel'], $_POST['equipo'])) {
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];
        $nivel = $_POST['nivel'];
        $estado = isset($_POST['estado']) ? $_POST['estado'] : 1;
        $equipo = $_POST['equipo'];

        if (!empty($usuario) && !empty($contrasena) && !empty($nivel) && !empty($equipo)) {
            $hashed_password = password_hash($contrasena, PASSWORD_DEFAULT);

            $sql = "INSERT INTO usuario (usuario, contrasena, nivel, estado, preferencia_equipo) VALUES (:usuario, :contrasena, :nivel, :estado, :equipo)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
            $stmt->bindParam(':contrasena', $contrasena, PDO::PARAM_STR);
            $stmt->bindParam(':nivel', $nivel, PDO::PARAM_INT);
            $stmt->bindParam(':estado', $estado, PDO::PARAM_INT);
            $stmt->bindParam(':equipo', $equipo, PDO::PARAM_STR);

            $stmt->execute();

            echo json_encode(array('success' => true, 'ultimo_id_insertado' => $pdo->lastInsertId()));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Faltan Campos Obligatorios'));
    }
} catch (PDOException $e) {
    echo json_encode(array('success' => false, 'message' => 'Error al ejecutar la consulta: ' . $e->getMessage()));
}
?>

