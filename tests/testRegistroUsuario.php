<?php

use PHPUnit\Framework\TestCase;

require_once 'registroUsuario.php';

class RegistroUsuarioTest extends TestCase
{
    public function testRegistroUsuario()
    {
        $pdoMock = $this->createMock(PDO::class);
        $pdoStatementMock = $this->createMock(PDOStatement::class);
        $pdoMock->expects($this->once())
            ->method('prepare')
            ->willReturn($pdoStatementMock);
        $pdoStatementMock->expects($this->once())
            ->method('bindParam')
            ->willReturn(true);
        $pdoStatementMock->expects($this->once())
            ->method('execute')
            ->willReturn(true);
        $pdoMock->expects($this->once())
            ->method('lastInsertId')
            ->willReturn(1);

        global $pdo;
        $pdo = $pdoMock;

        $resultadoEsperado = array('success' => true, 'ultimo_id_insertado' => 1);

        $this->assertEquals($resultadoEsperado, registrarUsuario('usuario', 'contraseña', 1, 'equipo'));
    }
}
