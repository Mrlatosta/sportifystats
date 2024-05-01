<?php
header('Content-Type: application/json; charset=UTF-8');
include('conexion.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["user"];
    $password = $_POST["pswd"];

    try {
        $sql = "call COMPRUEBA_USUARIO(:username)";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        
        while ($resultado = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $existUser = $resultado["existe"];
        }

        if ($existUser == 1) {
            $sql = "call COMPRUEBA_CONTRASENA(:username,:password);";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->execute();
            
            while ($resultado = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $valido = $resultado["estado"];
            }

            if ($valido == 1) {
                session_start();

                $sql = "call INICIA_SESION(:username,:password);";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':username', $username, PDO::PARAM_STR);
                $stmt->bindParam(':password', $password, PDO::PARAM_STR);
                $stmt->execute();
                
                while ($resultado = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $_SESSION["idUsuario"]  = $resultado["id_usuario"];
                    $_SESSION["usuario"]  = $resultado["usuario"];
                    $_SESSION["nivelUsuario"]  = $resultado["nivel"];
                }

                // Establecer cookie de sesión
                setcookie("idUsuario", $_SESSION["idUsuario"], time() + (86400 * 30), "/"); // 86400 = 1 día

                echo json_encode([
                    'estatusSesion' => 1,
                    'idUsuario' => $_SESSION["idUsuario"],
                    'userName' => $_SESSION["usuario"],
                    'nivelUsuario' => $_SESSION["nivelUsuario"]
                ]);
            } else {
                echo json_encode([
                    'estatusSesion' => 0,
                    'txt' => "Contraseña incorrecta"
                ]);
            }
        } else {
            echo json_encode([
                'estatusSesion' => 0,
                'txt' => "Usuario no existe o está inactivo"
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'estatusSesion' => -1,
            'txt' => "Error: " . $e->getMessage()
        ]);
    }
}
?>
