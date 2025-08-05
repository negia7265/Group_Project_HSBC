-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_type` enum('stock','bond','crypto','gold','cash') NOT NULL,
  `asset_name` varchar(100) NOT NULL,
  `ticker_symbol` varchar(10) DEFAULT NULL,
  `current_price` decimal(15,2) DEFAULT NULL,
  `price_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'stock','Google','GOOGL',2900.00,'2025-08-03'),(2,'stock','Amazon','AMZN',3300.00,'2025-08-03'),(3,'stock','Apple','AAPL',150.00,'2025-08-03'),(4,'stock','Tesla','TSLA',700.00,'2025-08-03'),(5,'bond','US Treasury 10Y',NULL,1000.00,'2025-08-03'),(6,'bond','Corporate Bond AAA',NULL,980.00,'2025-08-03'),(7,'crypto','Bitcoin','BTC',43000.00,'2025-08-03'),(8,'crypto','Ethereum','ETH',3200.00,'2025-08-03'),(9,'crypto','Cardano','ADA',1.20,'2025-08-03'),(10,'gold','Gold',NULL,6000.00,'2025-08-03'),(11,'gold','Silver',NULL,80.00,'2025-08-03'),(12,'cash','US Dollar Cash',NULL,1.00,'2025-08-03'),(13,'stock','Microsoft','MSFT',280.00,'2025-08-03'),(14,'stock','Facebook','META',350.00,'2025-08-03'),(15,'bond','Municipal Bond',NULL,950.00,'2025-08-03'),(16,'crypto','Solana','SOL',35.00,'2025-08-03'),(17,'stock','Netflix','NFLX',550.00,'2025-08-03'),(18,'stock','Nvidia','NVDA',220.00,'2025-08-03'),(19,'bond','Government Bond A',NULL,1000.00,'2025-08-03'),(20,'crypto','Ripple','XRP',0.90,'2025-08-03'),(21,'stock','Google','GOOGL',2900.00,'2025-08-02');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holdings`
--

DROP TABLE IF EXISTS `holdings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holdings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `asset_type` enum('stock','bond','crypto','gold','cash') NOT NULL,
  `asset_name` varchar(100) NOT NULL,
  `ticker_symbol` varchar(10) DEFAULT NULL,
  `quantity` decimal(15,4) NOT NULL,
  `buy_price` decimal(15,2) NOT NULL,
  `current_price` decimal(15,2) DEFAULT NULL,
  `buy_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holdings`
--

LOCK TABLES `holdings` WRITE;
/*!40000 ALTER TABLE `holdings` DISABLE KEYS */;
INSERT INTO `holdings` VALUES (1,1,'stock','Google','GOOGL',5.0000,2800.50,2900.75,'2023-10-01'),(2,2,'stock','Amazon','AMZN',3.0000,3400.00,3300.00,'2023-09-15'),(3,3,'stock','Apple','AAPL',10.0000,150.00,165.00,'2023-11-10'),(4,4,'crypto','Bitcoin','BTC',0.2000,30000.00,32000.00,'2023-12-01'),(5,5,'crypto','Ethereum','ETH',1.5000,1800.00,1900.00,'2023-12-15'),(6,6,'gold','Gold',NULL,100.0000,5800.00,6000.00,'2024-01-10'),(7,7,'bond','Government Bond 2025',NULL,50.0000,100.00,102.00,'2023-07-01'),(8,8,'bond','Corporate Bond A1',NULL,30.0000,98.00,99.50,'2023-06-05'),(9,9,'stock','Tesla','TSLA',4.0000,700.00,750.00,'2024-01-01'),(10,10,'crypto','Solana','SOL',10.0000,35.00,38.00,'2023-12-20'),(11,11,'stock','Microsoft','MSFT',6.0000,250.00,260.00,'2024-02-10'),(12,12,'crypto','Cardano','ADA',1000.0000,0.50,0.60,'2023-10-25'),(13,13,'gold','Gold ETF',NULL,75.0000,5800.00,6050.00,'2023-11-30'),(14,14,'cash','USD','USD',1000.0000,1.00,1.00,'2024-01-20'),(15,15,'cash','INR','INR',75000.0000,1.00,1.00,'2024-02-01'),(16,16,'bond','Municipal Bond B2',NULL,40.0000,95.00,97.00,'2023-05-05'),(17,17,'stock','Meta','META',7.0000,320.00,330.00,'2023-12-05'),(18,18,'crypto','Ripple','XRP',500.0000,0.90,1.10,'2024-03-01'),(19,19,'gold','Physical Gold',NULL,50.0000,5900.00,6100.00,'2023-10-10'),(20,20,'stock','Netflix','NFLX',2.0000,550.00,560.00,'2024-04-01');
/*!40000 ALTER TABLE `holdings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profit`
--

DROP TABLE IF EXISTS `profit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profit` (
  `profit_date` date NOT NULL,
  `profit` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profit`
--

LOCK TABLES `profit` WRITE;
/*!40000 ALTER TABLE `profit` DISABLE KEYS */;
INSERT INTO `profit` VALUES ('2025-07-01',1523.5),('2025-07-02',-321.75),('2025-07-03',845),('2025-07-04',962.25),('2025-07-05',-110.1),('2025-07-06',487.35),('2025-07-07',129),('2025-07-08',-50),('2025-07-09',772.4),('2025-07-10',340),('2025-07-11',1190.6),('2025-07-12',-80),('2025-07-13',950),('2025-07-14',235.75),('2025-07-15',670.3),('2025-07-16',-45),('2025-07-17',1020),('2025-07-18',310.5),('2025-07-19',720),('2025-07-20',-95.4);
/*!40000 ALTER TABLE `profit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asset_id` int NOT NULL,
  `transaction_type` enum('buy','sell') NOT NULL,
  `asset_type` enum('stock','bond','crypto','gold','cash') NOT NULL,
  `asset_name` varchar(100) NOT NULL,
  `ticker_symbol` varchar(10) DEFAULT NULL,
  `quantity` decimal(15,4) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `total_value` decimal(15,2) GENERATED ALWAYS AS ((`quantity` * `price`)) STORED,
  `transaction_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `asset_id`, `transaction_type`, `asset_type`, `asset_name`, `ticker_symbol`, `quantity`, `price`, `transaction_date`) VALUES (2,1,'buy','stock','Google','GOOGL',5.0000,2800.00,'2025-07-01 10:30:00'),(3,2,'buy','crypto','Bitcoin','BTC',0.2500,60000.00,'2025-07-01 11:00:00'),(4,3,'buy','gold','Gold Bar',NULL,1.0000,58000.00,'2025-07-01 12:00:00'),(5,4,'buy','bond','Gov Bond A',NULL,10.0000,1000.00,'2025-07-02 09:00:00'),(6,1,'sell','stock','Google','GOOGL',2.0000,2900.00,'2025-07-03 15:00:00'),(7,5,'buy','crypto','Ethereum','ETH',1.5000,3800.00,'2025-07-04 10:15:00'),(8,6,'buy','stock','Amazon','AMZN',3.0000,3500.00,'2025-07-04 14:30:00'),(9,7,'buy','cash','USD',NULL,500.0000,1.00,'2025-07-05 09:00:00'),(10,8,'buy','crypto','Dogecoin','DOGE',1000.0000,0.06,'2025-07-05 13:45:00'),(11,9,'buy','bond','Corp Bond B',NULL,5.0000,950.00,'2025-07-06 11:20:00'),(12,10,'buy','stock','Tesla','TSLA',2.0000,720.00,'2025-07-07 10:10:00'),(13,10,'sell','stock','Tesla','TSLA',1.0000,750.00,'2025-07-08 16:00:00'),(14,11,'buy','crypto','Solana','SOL',15.0000,30.00,'2025-07-09 10:00:00'),(15,12,'buy','bond','Muni Bond C',NULL,3.0000,1020.00,'2025-07-10 14:00:00'),(16,13,'buy','stock','Meta','META',4.0000,330.00,'2025-07-11 12:00:00'),(17,2,'sell','crypto','Bitcoin','BTC',0.0500,61000.00,'2025-07-12 15:00:00'),(18,14,'buy','stock','Netflix','NFLX',6.0000,500.00,'2025-07-13 10:45:00'),(19,15,'buy','crypto','Ripple','XRP',300.0000,0.75,'2025-07-14 13:00:00'),(20,3,'sell','gold','Gold Bar',NULL,0.5000,59000.00,'2025-07-15 11:30:00'),(21,16,'buy','gold','Gold ETF',NULL,2.0000,57500.00,'2025-07-16 09:30:00');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `budget` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (1,'Ayush Negi',1000000);
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-05 16:45:00
