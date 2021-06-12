CREATE DATABASE  IF NOT EXISTS `daweb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `daweb`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: daweb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo` (
  `idArticulo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `precio` double NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `disponibilidad` enum('en venta','cambiado','comprado') DEFAULT 'en venta',
  `foto` varchar(2083) NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('nuevo','bueno','malo') NOT NULL,
  `categoria` varchar(45) NOT NULL,
  `visualizaciones` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idArticulo`,`idUsuario`),
  UNIQUE KEY `idArticulo_UNIQUE` (`idArticulo`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES (65,'Xiamo Redyours Note 6',88,'Un móvil en buen estado con un solo uso. Con garantía.','en venta','myImage-1623485585836.png','2021-06-12','nuevo','Electronica',0000000000,18),(66,'Televisor GL',40,'Televisor de 5 años, de buen estado. Ideal para adornar cualquier salón. Con puerto HDMI','en venta','myImage-1623485670824.png','2021-06-12','bueno','Electronica',0000000000,18),(67,'tennis Nike Jordan',42,'Tennis ya utizados. No recomiendo usarlo para uso diario, más bien es ya un articulo de coleccionista','cambiado','myImage-1623485748015.png','2021-06-12','bueno','Hogar',0000000000,19),(68,'Altavoces chinosos',32,'Altavoces de aliexpres. Cumplen su función y te ahorras el envío desde china. Todo ventajas','cambiado','myImage-1623485845102.png','2021-06-12','bueno','Electronica',0000000000,18),(69,'Portatil Acer',2,'Portátil Acer en no muy estado como se puede observar en la foto. Ideal para desguazarlo y rescatar componentes.','en venta','myImage-1623485913951.png','2021-06-12','malo','Electronica',0000000000,19),(70,'Ventilador de pie',12,'Me agradecerás tenerlo en verano.','comprado','myImage-1623485989302.png','2021-06-12','nuevo','Hogar',0000000000,18),(71,'Blue Dead Bludeption II',30,'Un juego de última generación. Simulación del sherrif.','en venta','myImage-1623486074781.png','2021-06-12','bueno','Videojuegos',0000000000,19);
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `clave` varchar(20) NOT NULL,
  `credito` double unsigned NOT NULL,
  `provincia` varchar(20) NOT NULL,
  `mail` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `idUsuario_UNIQUE` (`idUsuario`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (18,'Álvaro','Gómez Fernández','alvarogf','123',102,'La Coruña','alvaro.gomezf@um.es'),(19,'Jorge','Cabezos Casado','jorgecc','123',24,'Toledo','jorge.cc@um.es');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-12 10:25:01
