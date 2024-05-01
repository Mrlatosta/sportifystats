<?php
	$servidor = "localhost";
	$usuario = "root";
	$contraseña = "";
	$base_de_datos = "sportdb";

	// Conexión utilizando PDO
	try {
	    $pdo = new PDO("mysql:host=$servidor;dbname=$base_de_datos", $usuario, $contraseña);
	    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
	    die("Error al conectar: " . $e->getMessage());
	}
?>