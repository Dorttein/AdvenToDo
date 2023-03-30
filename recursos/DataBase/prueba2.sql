-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2023 a las 23:49:20
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enemy`
--

CREATE TABLE `enemy` (
  `ID` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `loot` int(11) NOT NULL,
  `damage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equiped`
--

CREATE TABLE `equiped` (
  `ID_user` int(11) NOT NULL,
  `ID_object` int(11) NOT NULL,
  `equiped` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locked`
--

CREATE TABLE `locked` (
  `ID_user` int(11) NOT NULL,
  `ID_object` int(11) NOT NULL,
  `locked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `object`
--

CREATE TABLE `object` (
  `ID` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `ATK` int(11) NOT NULL,
  `DEF` int(11) NOT NULL,
  `HP` int(11) NOT NULL,
  `recoil` int(11) NOT NULL,
  `heal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subtarea`
--

CREATE TABLE `subtarea` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ID_tarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `detail` int(255) NOT NULL,
  `initial_date` date NOT NULL,
  `limit_date` date NOT NULL,
  `again` int(11) NOT NULL,
  `important` tinyint(1) NOT NULL,
  `ID_user` int(11) NOT NULL,
  `ID_lista` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `action` int(11) NOT NULL,
  `HP_character` int(11) NOT NULL,
  `HP_enemy` int(11) NOT NULL,
  `ID_enemy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `enemy`
--
ALTER TABLE `enemy`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `equiped`
--
ALTER TABLE `equiped`
  ADD PRIMARY KEY (`ID_user`,`ID_object`),
  ADD KEY `ID_object` (`ID_object`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `locked`
--
ALTER TABLE `locked`
  ADD PRIMARY KEY (`ID_user`,`ID_object`),
  ADD KEY `ID_object` (`ID_object`);

--
-- Indices de la tabla `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `subtarea`
--
ALTER TABLE `subtarea`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_tarea` (`ID_tarea`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`),
  ADD KEY `ID_lista` (`ID_lista`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_enemy` (`ID_enemy`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equiped`
--
ALTER TABLE `equiped`
  ADD CONSTRAINT `equiped_ibfk_1` FOREIGN KEY (`ID_object`) REFERENCES `object` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equiped_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `locked`
--
ALTER TABLE `locked`
  ADD CONSTRAINT `locked_ibfk_1` FOREIGN KEY (`ID_object`) REFERENCES `object` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locked_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `subtarea`
--
ALTER TABLE `subtarea`
  ADD CONSTRAINT `subtarea_ibfk_1` FOREIGN KEY (`ID_tarea`) REFERENCES `tarea` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `usuario` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`ID_lista`) REFERENCES `lista` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`ID_enemy`) REFERENCES `enemy` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
