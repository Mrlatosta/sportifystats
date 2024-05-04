-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2024 a las 09:53:21
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sportdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `COMPRUEBA_CONTRASENA` (`user_name` VARCHAR(20), `pass` VARCHAR(255))   BEGIN
    DECLARE hashed_pass VARCHAR(255); -- Variable para almacenar la contraseña cifrada

    -- Obtener la contraseña cifrada del usuario
    SELECT contrasena INTO hashed_pass
    FROM usuario
    WHERE usuario = user_name AND estado = 1;

    -- Verificar si se encontró un usuario activo con el nombre dado
    IF hashed_pass IS NOT NULL THEN
        -- Verificar si la contraseña proporcionada coincide con la almacenada
        IF hashed_pass = pass THEN
            -- Si la contraseña coincide, devolver 1 (estado válido)
            SELECT 1 AS estado;
        ELSE
            -- Si la contraseña no coincide, devolver 0 (estado inválido)
            SELECT 0 AS estado;
        END IF;
    ELSE
        -- Si no se encuentra ningún usuario activo con el nombre dado, devolver 0 (estado inválido)
        SELECT 0 AS estado;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `COMPRUEBA_USUARIO` (`user_name` VARCHAR(20))   BEGIN
    SELECT COUNT(1) as existe 
    FROM usuario 
    WHERE usuario = user_name
    AND estado = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INICIA_SESION` (IN `user_name` VARCHAR(20), IN `user_pass` VARCHAR(255))   BEGIN
    DECLARE user_id INT;
    DECLARE user_username VARCHAR(20);
    DECLARE user_nivel INT;

    -- Obtener el ID, nombre de usuario y nivel del usuario
    SELECT id_usuario, usuario, nivel INTO user_id, user_username, user_nivel
    FROM usuario
    WHERE usuario = user_name AND estado = 1;

    -- Iniciar sesión si se encuentra el usuario
    IF user_id IS NOT NULL THEN
        -- Se encontró el usuario, iniciar sesión
        INSERT INTO sesion (id_usuario, fecha_inicio)
        VALUES (user_id, NOW());

        -- Devolver datos de sesión
        SELECT user_id AS id_usuario, user_username AS usuario, user_nivel AS nivel;
    ELSE
        -- Usuario no encontrado o inactivo, devolver mensaje de error
        SELECT -1 AS id_usuario, 'Usuario no encontrado o inactivo' AS usuario, -1 AS nivel;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `id_sesion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id_sesion`, `id_usuario`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 5, '2024-05-04 02:17:42', NULL),
(2, 9, '2024-05-04 02:21:13', NULL),
(3, 5, '2024-05-04 02:22:09', NULL),
(4, 5, '2024-05-04 02:28:58', NULL),
(5, 9, '2024-05-04 02:34:53', NULL),
(6, 10, '2024-05-04 02:36:27', NULL),
(7, 11, '2024-05-04 02:49:10', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nivel` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `preferencia_equipo` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `usuario`, `contrasena`, `nivel`, `estado`, `preferencia_equipo`) VALUES
(2, 'Raymundo', '$2y$10$u2lPw4qrLiwM4hcJXNGKsuyk0P3KfVELnsfEYKXJFl/1oWplRnaMu', 1, 1, ''),
(3, 'Prueba', '$2y$10$t3F0qbdUGQunvDD20Y5El.AgTmoq2oD5DjJXZ/HZx6RvhzBMs2DWG', 1, 1, ''),
(4, 'Ray', '$2y$10$2TOKvZqh45DOQB36NPve/.pHoxSJmP6P/6iW.dT9HTndKg93VA6B.', 1, 1, 'Manchester City'),
(5, 'asd', 'asd', 1, 1, 'Arsenal'),
(6, 'qwe', 'qwe', 1, 1, 'Manchester City'),
(7, 'sex123', '$2y$10$qGeUORySmkoVaBdFiPuFPe9Hp..HwcX3LL8GQADneIvn8oirtAhae', 1, 1, 'Manchester City'),
(9, 'thay', 'thay', 1, 1, 'Manchester City'),
(10, 'Axel', 'sex', 1, 1, 'Manchester City'),
(11, 'xcv', 'xcv', 1, 1, 'Burnley');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id_sesion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `id_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
