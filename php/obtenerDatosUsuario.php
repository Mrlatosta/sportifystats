<?php
header('Content-Type: application/json; charset=UTF-8');
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["idUsuario"])) {
    $idUsuario = $_GET["idUsuario"];

    try {
        $sql = "SELECT * FROM usuario WHERE id_usuario = :idUsuario";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            echo json_encode([
                'success' => true,
                'usuario' => $row
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No se encontró ningún usuario con el ID especificado'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error al obtener el usuario: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Se requiere un ID de usuario válido'
    ]);
}
?>
