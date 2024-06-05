-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2024 a las 13:55:10
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
-- Base de datos: `bodega`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositos`
--

CREATE TABLE `depositos` (
  `d` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `tipo` enum('Barrica','Aluminio','Hormigon','Lote') CHARACTER SET utf16 COLLATE utf16_spanish2_ci NOT NULL,
  `capacidad` float NOT NULL,
  `contenidoActual` float NOT NULL,
  `porcentaje` float NOT NULL,
  `destino` enum('Fermentacion','DepositoCrianza','Maduracion','Embotellado','Madera') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `depositos`
--

INSERT INTO `depositos` (`d`, `nombre`, `tipo`, `capacidad`, `contenidoActual`, `porcentaje`, `destino`) VALUES
(12, 'Fermentacion1', 'Aluminio', 75000, 0, 0, 'Fermentacion'),
(13, 'Fermentacion2', 'Hormigon', 75000, 0, 0, 'Fermentacion'),
(14, 'Fermentacion3', 'Aluminio', 75000, 0, 0, 'Fermentacion'),
(15, 'Maduracion1', 'Aluminio', 75000, 25000, 0, 'Maduracion'),
(16, 'Maduracion2', 'Hormigon', 75000, 0, 0, 'Maduracion'),
(17, 'Maduracion3', 'Aluminio', 75000, 0, 0, 'Maduracion'),
(18, 'Madera1', 'Barrica', 75000, 0, 0, 'Madera'),
(19, 'Madera2', 'Barrica', 75000, 0, 0, 'Madera'),
(20, 'Madera3', 'Barrica', 75000, 0, 0, 'Madera'),
(21, 'Crianza1', 'Aluminio', 75000, 0, 0, 'DepositoCrianza'),
(22, 'Crianza2', 'Aluminio', 75000, 5000, 0, 'DepositoCrianza'),
(23, 'Botella1', 'Lote', 50000, 15000, 0, 'Embotellado'),
(24, 'Botella2', 'Lote', 50000, 20000, 0, 'Embotellado'),
(25, 'Botella3', 'Lote', 50000, 50000, 0, 'Embotellado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcasvino`
--

CREATE TABLE `marcasvino` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `añada` int(11) NOT NULL,
  `puntoVenta` varchar(100) NOT NULL,
  `cantidadBotellas` int(11) NOT NULL,
  `tiempoBarrica` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE `operaciones` (
  `o` int(11) NOT NULL,
  `idOrigen` int(11) NOT NULL,
  `idDestino` int(11) NOT NULL,
  `operacion` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` float NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `productos` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`o`, `idOrigen`, `idDestino`, `operacion`, `fecha`, `cantidad`, `descripcion`, `productos`) VALUES
(5, 12, 15, 1, '2023-10-20', 25000, 'Trasegado', 'Ninguno'),
(6, 12, 16, 1, '2023-10-20', 25000, 'Trasegado', 'Ninguno'),
(7, 13, 16, 1, '2023-10-20', 35000, 'Trasegado', 'Ninguno'),
(8, 14, 17, 1, '2023-10-20', 55000, 'Trasegado', 'Ninguno'),
(9, 16, 18, 1, '2024-03-20', 20000, 'Maduracion en barrica', 'Ninguno'),
(10, 16, 19, 1, '2024-03-20', 15000, 'Maduracion en barrica', 'Ninguno'),
(11, 17, 20, 1, '2024-03-20', 55000, 'Maduracion en barrica', 'Ninguno'),
(12, 18, 21, 1, '2024-05-20', 20000, 'Crianza', 'Ninguno'),
(13, 19, 21, 1, '2024-05-20', 15000, 'Crianza', 'Ninguno'),
(14, 20, 22, 1, '2024-05-20', 55000, 'Crianza', 'Ninguno'),
(15, 21, 23, 3, '2024-05-30', 15000, 'Embotellado', 'Ninguno'),
(16, 21, 24, 3, '2024-05-29', 20000, 'Embotellado', 'Ninguno'),
(17, 22, 25, 3, '2024-05-31', 50000, 'Embotellado', 'Ninguno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipooperacion`
--

CREATE TABLE `tipooperacion` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipooperacion`
--

INSERT INTO `tipooperacion` (`id`, `descripcion`) VALUES
(1, 'Trasegado'),
(2, 'Productos'),
(3, 'Embotellado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipouva`
--

CREATE TABLE `tipouva` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipouva`
--

INSERT INTO `tipouva` (`id`, `nombre`) VALUES
(1, 'Tempranillo'),
(2, 'Garnacha');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajesuva`
--

CREATE TABLE `viajesuva` (
  `vu` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `grado` int(11) NOT NULL,
  `ph` float NOT NULL,
  `kgViaje` int(11) NOT NULL,
  `idViticutor` int(11) NOT NULL,
  `idDeposito` int(11) NOT NULL,
  `Parcela` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `viajesuva`
--

INSERT INTO `viajesuva` (`vu`, `fecha`, `grado`, `ph`, `kgViaje`, `idViticutor`, `idDeposito`, `Parcela`) VALUES
(4, '2023-09-28', 14, 7, 20000, 1, 12, 'parcela'),
(5, '2023-09-28', 14, 7, 15000, 19, 13, 'parcela'),
(6, '2023-09-28', 14, 7, 30000, 19, 12, 'parcela'),
(7, '2023-09-28', 14, 7, 10000, 25, 13, 'parcela'),
(8, '2023-09-28', 14, 7, 10000, 26, 13, 'parcela'),
(9, '2023-09-28', 14, 7, 40000, 1, 14, 'parcela'),
(10, '2023-09-28', 14, 7, 15000, 19, 14, 'parcela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viticultor`
--

CREATE TABLE `viticultor` (
  `vi` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `telefono` int(9) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `poblacion` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `codigoPostal` varchar(5) NOT NULL,
  `dni` varchar(9) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `viticultor`
--

INSERT INTO `viticultor` (`vi`, `nombre`, `telefono`, `direccion`, `poblacion`, `provincia`, `codigoPostal`, `dni`) VALUES
(1, 'Diego Martinez', 695132216, 'c/ montelatorre 8', 'Aranda de Duero', 'Burgos', '09400', '12345678J'),
(19, 'haNNAh', 123456789, 'asdfasd', 'swadfdasd', 'qasfdasd', '10', '12345678A'),
(24, '', 0, '', '', '', '', ''),
(25, '123', 123, '123', '123', '123', '123', '123'),
(26, 'asd', 123, 'asd', 'asd', 'asd', '12345', '12345678A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `depositos`
--
ALTER TABLE `depositos`
  ADD PRIMARY KEY (`d`);

--
-- Indices de la tabla `marcasvino`
--
ALTER TABLE `marcasvino`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`o`),
  ADD KEY `operaciones_ibfk_1` (`operacion`);

--
-- Indices de la tabla `tipooperacion`
--
ALTER TABLE `tipooperacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipouva`
--
ALTER TABLE `tipouva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viajesuva`
--
ALTER TABLE `viajesuva`
  ADD PRIMARY KEY (`vu`);

--
-- Indices de la tabla `viticultor`
--
ALTER TABLE `viticultor`
  ADD PRIMARY KEY (`vi`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `depositos`
--
ALTER TABLE `depositos`
  MODIFY `d` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `marcasvino`
--
ALTER TABLE `marcasvino`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `o` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tipooperacion`
--
ALTER TABLE `tipooperacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipouva`
--
ALTER TABLE `tipouva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `viajesuva`
--
ALTER TABLE `viajesuva`
  MODIFY `vu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `viticultor`
--
ALTER TABLE `viticultor`
  MODIFY `vi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD CONSTRAINT `operaciones_ibfk_1` FOREIGN KEY (`operacion`) REFERENCES `tipooperacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
