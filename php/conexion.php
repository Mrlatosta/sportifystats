<?php
	$servidor = "database-sportify.cjyqay84wvgi.us-east-1.rds.amazonaws.com";
	$usuario = "admin";
	$contraseña = "sportify123";
	$base_de_datos = "sportifydb";

	// Conexión utilizando PDO
	try {
	    $pdo = new PDO("mysql:host=$servidor;dbname=$base_de_datos", $usuario, $contraseña);
	    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
	    die("Error al conectar: " . $e->getMessage());
	}
?>