CREATE DATABASE  IF NOT EXISTS `koala` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `koala`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: koala
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `lista_produto`
--

DROP TABLE IF EXISTS `lista_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_produto` (
  `id_lista_produto` int NOT NULL AUTO_INCREMENT,
  `id_lista` int DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  `quant_comprada` double DEFAULT NULL,
  PRIMARY KEY (`id_lista_produto`),
  KEY `lista_produto_ibfk_1` (`id_produto`),
  KEY `lista_produto_ibfk_2` (`id_lista`),
  CONSTRAINT `lista_produto_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lista_produto_ibfk_2` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id_lista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_produto`
--

LOCK TABLES `lista_produto` WRITE;
/*!40000 ALTER TABLE `lista_produto` DISABLE KEYS */;
INSERT INTO `lista_produto` VALUES (29,14,24,2),(30,14,23,12),(31,14,22,5),(32,14,21,10),(33,14,25,0.5),(34,14,26,0.5),(35,14,27,1);
/*!40000 ALTER TABLE `lista_produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-30 11:57:21
