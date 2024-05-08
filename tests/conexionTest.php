<?php

use PHPUnit\Framework\TestCase;

class ConexionTest extends TestCase
{
    public function testConexionExitosa()
    {
        // Reemplaza los valores con tus credenciales
        $servidor = "localhost";
        $usuario = "root";
        $contraseña = "";
        $base_de_datos = "sportdb";

        // Intenta conectar utilizando PDO
        try {
            $pdo = new PDO("mysql:host=$servidor;dbname=$base_de_datos", $usuario, $contraseña);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Verifica que la conexión se haya establecido correctamente
            $this->assertInstanceOf(PDO::class, $pdo);

        } catch (PDOException $e) {
            // Si se produce un error durante la conexión, la prueba falla
            $this->fail("Error al conectar: " . $e->getMessage());
        }
    }
}
