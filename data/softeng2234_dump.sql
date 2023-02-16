-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: softeng2234
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Survey_Keyword`
--

DROP TABLE IF EXISTS `Survey_Keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Survey_Keyword` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `questionnaireId` int NOT NULL,
  `keywordId` int NOT NULL,
  PRIMARY KEY (`questionnaireId`,`keywordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Survey_Keyword`
--

LOCK TABLES `Survey_Keyword` WRITE;
/*!40000 ALTER TABLE `Survey_Keyword` DISABLE KEYS */;
INSERT INTO `Survey_Keyword` VALUES ('2023-02-16 19:53:44','2023-02-16 19:53:44',1,1),('2023-02-16 19:53:44','2023-02-16 19:53:44',1,2),('2023-02-16 19:53:44','2023-02-16 19:53:44',1,3),('2023-02-16 19:53:44','2023-02-16 19:53:44',1,4),('2023-02-16 19:53:44','2023-02-16 19:53:44',1,5);
/*!40000 ALTER TABLE `Survey_Keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `corporation` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `ageGroup` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `income` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` VALUES (1,'admin','$2b$10$DFHbx2ySuY2HtI2F569T2.3EQVvrNSulX632nROMJuM2HAOvuyi8O','softlab','Altan','Avtzi','18-24','Male','Athens','Attica','Upper Secondary Education','<5.000','2023-02-16 19:53:33','2023-02-16 19:53:33');
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `optID` varchar(255) DEFAULT NULL,
  `nextqID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `questionId` int DEFAULT NULL,
  `nextQuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `questionId` (`questionId`),
  KEY `nextQuestionId` (`nextQuestionId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`nextQuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'Ποδόσφαιρο','Q01A1','Q02','2023-02-16 19:53:44','2023-02-16 19:53:44',1,2),(2,'Μπάσκετ','Q01A2','Q02','2023-02-16 19:53:44','2023-02-16 19:53:44',1,2),(3,'Τέννις','Q01A3','Q02','2023-02-16 19:53:44','2023-02-16 19:53:44',1,2),(4,'Ναι','Q02A1','Q03','2023-02-16 19:53:44','2023-02-16 19:53:44',2,3),(5,'Όχι','Q02A2','Q04','2023-02-16 19:53:44','2023-02-16 19:53:44',2,4),(6,'1','Q03A1','Q05','2023-02-16 19:53:44','2023-02-16 19:53:44',3,5),(7,'2','Q03A2','Q05','2023-02-16 19:53:44','2023-02-16 19:53:44',3,5),(8,'3','Q03A3','Q05','2023-02-16 19:53:44','2023-02-16 19:53:44',3,5),(9,'4+','Q03A4','Q05','2023-02-16 19:53:44','2023-02-16 19:53:44',3,5),(10,'Είμαι πολύ νέος ακόμα','Q04A1','Q06','2023-02-16 19:53:44','2023-02-16 19:53:44',4,6),(11,'Δεν μου αρέσουν τα παιδιά','Q04A2','Q06','2023-02-16 19:53:44','2023-02-16 19:53:44',4,6),(12,'Δεν έχω την οικονομική άνεση','Q04A3','Q06','2023-02-16 19:53:44','2023-02-16 19:53:44',4,6),(13,'Ναι','Q05A1','Q07','2023-02-16 19:53:44','2023-02-16 19:53:44',5,7),(14,'Όχι','Q05A2','Q07','2023-02-16 19:53:44','2023-02-16 19:53:44',5,7),(15,'Ναι','Q06A1','Q07','2023-02-16 19:53:44','2023-02-16 19:53:44',6,7),(16,'Όχι','Q06A2','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',6,8),(17,'1','Q07A1','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',7,8),(18,'2','Q07A2','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',7,8),(19,'3','Q07A3','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',7,8),(20,'4+','Q07A4','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',7,8),(21,'Φθινόπωρο','Q08A1','Q09','2023-02-16 19:53:44','2023-02-16 19:53:44',8,9),(22,'Χειμώνας','Q08A2','Q09','2023-02-16 19:53:44','2023-02-16 19:53:44',8,9),(23,'Άνοιξη','Q08A3','Q09','2023-02-16 19:53:44','2023-02-16 19:53:44',8,9),(24,'Καλοκαίρι','Q08A4','Q09','2023-02-16 19:53:44','2023-02-16 19:53:44',8,9),(25,'Κόκκινο','Q09A1','Q10','2023-02-16 19:53:44','2023-02-16 19:53:44',9,10),(26,'Πράσινο','Q09A2','Q10','2023-02-16 19:53:44','2023-02-16 19:53:44',9,10),(27,'Μπλε','Q09A3','Q10','2023-02-16 19:53:44','2023-02-16 19:53:44',9,10),(28,'Σκύλος','Q10A1','-','2023-02-16 19:53:44','2023-02-16 19:53:44',10,NULL),(29,'Γάτα','Q10A2','-','2023-02-16 19:53:44','2023-02-16 19:53:44',10,NULL),(30,'Παπαγάλος','Q10A3','-','2023-02-16 19:53:44','2023-02-16 19:53:44',10,NULL),(31,'Κουνέλι','Q10A4','-','2023-02-16 19:53:44','2023-02-16 19:53:44',10,NULL);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keywords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (1,'sports','2023-02-16 19:53:44','2023-02-16 19:53:44'),(2,'kids','2023-02-16 19:53:44','2023-02-16 19:53:44'),(3,'colours','2023-02-16 19:53:44','2023-02-16 19:53:44'),(4,'seasons','2023-02-16 19:53:44','2023-02-16 19:53:44'),(5,'pets','2023-02-16 19:53:44','2023-02-16 19:53:44');
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionnaires`
--

DROP TABLE IF EXISTS `questionnaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionnaires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `about` text,
  `published` tinyint(1) DEFAULT '0',
  `questionnaireID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `administratorId` int DEFAULT NULL,
  `firstQuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `administratorId` (`administratorId`),
  KEY `firstQuestionId` (`firstQuestionId`),
  CONSTRAINT `questionnaires_ibfk_1` FOREIGN KEY (`administratorId`) REFERENCES `administrators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `questionnaires_ibfk_2` FOREIGN KEY (`firstQuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionnaires`
--

LOCK TABLES `questionnaires` WRITE;
/*!40000 ALTER TABLE `questionnaires` DISABLE KEYS */;
INSERT INTO `questionnaires` VALUES (1,'Demo Survey',NULL,1,'QQ999','2023-02-16 19:53:44','2023-02-16 19:53:44',1,1);
/*!40000 ALTER TABLE `questionnaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `required` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `answerType` varchar(255) DEFAULT 'options',
  `qID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `questionnaireId` int DEFAULT NULL,
  `ifSkippedNextQuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `questionnaireId` (`questionnaireId`),
  KEY `ifSkippedNextQuestionId` (`ifSkippedNextQuestionId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`questionnaireId`) REFERENCES `questionnaires` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`ifSkippedNextQuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Ποιο είναι το αγαπημένο σας άθλημα;','true','question','options','Q01','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(2,'Έχετε παιδιά;','true','question','options','Q02','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(3,'Πόσα παιδιά έχετε;','true','question','options','Q03','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(4,'Ποιος είναι ο λόγος που δεν έχετε (ακόμα) παιδιά;','true','question','options','Q04','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(5,'Σκοπεύετε να αποκτήσετε περισσότερα παιδιά;','true','question','options','Q05','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(6,'Σκοπεύετε να αποκτήσετε κάποια στιγμή στης ζωής σας παιδιά;','true','question','options','Q06','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(7,'Πόσα παιδιά θα θέλατε να έχετε;','true','question','options','Q07','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(8,'Ποια είναι η αγαπημένη σας εποχή;','true','question','options','Q08','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(9,'Ποιο είναι το αγαπημένο σας χρώμα;','true','question','options','Q09','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL),(10,'Ποιο πιστεύετε είναι το ιδανικό κατοικίδιο για το σπίτι;','true','question','options','Q10','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `finished` varchar(255) DEFAULT 'false',
  `submitted` varchar(255) DEFAULT 'false',
  `ses` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `questionnaireId` int DEFAULT NULL,
  `currentQuestionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `sessions_questionnaireId_userId_unique` (`userId`,`questionnaireId`),
  KEY `questionnaireId` (`questionnaireId`),
  KEY `currentQuestionId` (`currentQuestionId`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sessions_ibfk_2` FOREIGN KEY (`questionnaireId`) REFERENCES `questionnaires` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sessions_ibfk_3` FOREIGN KEY (`currentQuestionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'false','false','DEMA','2023-02-16 19:53:44','2023-02-16 19:53:44',1,NULL,NULL),(2,'false','false','DEMB','2023-02-16 19:53:46','2023-02-16 19:53:46',2,NULL,NULL),(3,'false','false','DEMC','2023-02-16 19:53:48','2023-02-16 19:53:48',3,NULL,NULL),(4,'false','false','DEMD','2023-02-16 19:53:49','2023-02-16 19:53:49',4,NULL,NULL),(5,'false','false','DEME','2023-02-16 19:53:51','2023-02-16 19:53:51',5,NULL,NULL),(6,'false','false','DEMF','2023-02-16 19:53:53','2023-02-16 19:53:53',6,NULL,NULL);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `username` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `administratorId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `administratorId` (`administratorId`),
  KEY `userId` (`userId`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`administratorId`) REFERENCES `administrators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tokens_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uniqueAnswers`
--

DROP TABLE IF EXISTS `uniqueAnswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uniqueAnswers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `context` varchar(255) DEFAULT NULL,
  `skipped` varchar(255) DEFAULT 'false',
  `questionID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `answerId` int DEFAULT NULL,
  `sessionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `uniqueAnswers_answerId_sessionId_unique` (`answerId`,`sessionId`),
  KEY `sessionId` (`sessionId`),
  CONSTRAINT `uniqueAnswers_ibfk_1` FOREIGN KEY (`answerId`) REFERENCES `answers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `uniqueAnswers_ibfk_2` FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uniqueAnswers`
--

LOCK TABLES `uniqueAnswers` WRITE;
/*!40000 ALTER TABLE `uniqueAnswers` DISABLE KEYS */;
INSERT INTO `uniqueAnswers` VALUES (1,'Ποδόσφαιρο','false',1,'2023-02-16 19:53:44','2023-02-16 19:53:44',1,1),(2,'Ναι','false',2,'2023-02-16 19:53:44','2023-02-16 19:53:44',4,1),(3,'1','false',3,'2023-02-16 19:53:45','2023-02-16 19:53:45',6,1),(4,'Ναι','false',5,'2023-02-16 19:53:45','2023-02-16 19:53:45',13,1),(5,'2','false',7,'2023-02-16 19:53:45','2023-02-16 19:53:45',18,1),(6,'Φθινόπωρο','false',8,'2023-02-16 19:53:45','2023-02-16 19:53:45',21,1),(7,'Κόκκινο','false',9,'2023-02-16 19:53:45','2023-02-16 19:53:45',25,1),(8,'Σκύλος','false',10,'2023-02-16 19:53:45','2023-02-16 19:53:45',28,1),(9,'Ποδόσφαιρο','false',1,'2023-02-16 19:53:46','2023-02-16 19:53:46',1,2),(10,'Ναι','false',2,'2023-02-16 19:53:46','2023-02-16 19:53:46',4,2),(11,'1','false',3,'2023-02-16 19:53:46','2023-02-16 19:53:46',6,2),(12,'Όχι','false',5,'2023-02-16 19:53:47','2023-02-16 19:53:47',14,2),(13,'1','false',7,'2023-02-16 19:53:47','2023-02-16 19:53:47',17,2),(14,'Φθινόπωρο','false',8,'2023-02-16 19:53:47','2023-02-16 19:53:47',21,2),(15,'Κόκκινο','false',9,'2023-02-16 19:53:47','2023-02-16 19:53:47',25,2),(16,'Σκύλος','false',10,'2023-02-16 19:53:47','2023-02-16 19:53:47',28,2),(17,'Μπάσκετ','false',1,'2023-02-16 19:53:48','2023-02-16 19:53:48',2,3),(18,'Όχι','false',2,'2023-02-16 19:53:48','2023-02-16 19:53:48',5,3),(19,'Δεν μου αρέσουν τα παιδιά','false',4,'2023-02-16 19:53:48','2023-02-16 19:53:48',11,3),(20,'Όχι','false',6,'2023-02-16 19:53:48','2023-02-16 19:53:48',16,3),(21,'Χειμώνας','false',8,'2023-02-16 19:53:48','2023-02-16 19:53:48',22,3),(22,'Πράσινο','false',9,'2023-02-16 19:53:49','2023-02-16 19:53:49',26,3),(23,'Γάτα','false',10,'2023-02-16 19:53:49','2023-02-16 19:53:49',29,3),(24,'Τέννις','false',1,'2023-02-16 19:53:49','2023-02-16 19:53:49',3,4),(25,'Όχι','false',2,'2023-02-16 19:53:49','2023-02-16 19:53:49',5,4),(26,'Δεν έχω την οικονομική άνεση','false',4,'2023-02-16 19:53:50','2023-02-16 19:53:50',12,4),(27,'Ναι','false',6,'2023-02-16 19:53:50','2023-02-16 19:53:50',15,4),(28,'3','false',7,'2023-02-16 19:53:50','2023-02-16 19:53:50',19,4),(29,'Άνοιξη','false',8,'2023-02-16 19:53:50','2023-02-16 19:53:50',23,4),(30,'Μπλε','false',9,'2023-02-16 19:53:50','2023-02-16 19:53:50',27,4),(31,'Παπαγάλος','false',10,'2023-02-16 19:53:50','2023-02-16 19:53:50',30,4),(32,'Ποδόσφαιρο','false',1,'2023-02-16 19:53:51','2023-02-16 19:53:51',1,5),(33,'Ναι','false',2,'2023-02-16 19:53:51','2023-02-16 19:53:51',4,5),(34,'4+','false',3,'2023-02-16 19:53:51','2023-02-16 19:53:51',9,5),(35,'Ναι','false',5,'2023-02-16 19:53:51','2023-02-16 19:53:51',13,5),(36,'1','false',7,'2023-02-16 19:53:52','2023-02-16 19:53:52',17,5),(37,'Καλοκαίρι','false',8,'2023-02-16 19:53:52','2023-02-16 19:53:52',24,5),(38,'Κόκκινο','false',9,'2023-02-16 19:53:52','2023-02-16 19:53:52',25,5),(39,'Κουνέλι','false',10,'2023-02-16 19:53:52','2023-02-16 19:53:52',31,5),(40,'Ποδόσφαιρο','false',1,'2023-02-16 19:53:53','2023-02-16 19:53:53',1,6),(41,'Όχι','false',2,'2023-02-16 19:53:53','2023-02-16 19:53:53',5,6),(42,'Είμαι πολύ νέος ακόμα','false',4,'2023-02-16 19:53:53','2023-02-16 19:53:53',10,6),(43,'Ναι','false',6,'2023-02-16 19:53:53','2023-02-16 19:53:53',15,6),(44,'4+','false',7,'2023-02-16 19:53:53','2023-02-16 19:53:53',20,6),(45,'Φθινόπωρο','false',8,'2023-02-16 19:53:53','2023-02-16 19:53:53',21,6),(46,'Πράσινο','false',9,'2023-02-16 19:53:54','2023-02-16 19:53:54',26,6),(47,'Παπαγάλος','false',10,'2023-02-16 19:53:54','2023-02-16 19:53:54',30,6);
/*!40000 ALTER TABLE `uniqueAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `ageGroup` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `income` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user','$2b$10$7BtvGFXVm8SOhuSCi7qCr.JFrrWRwq1j4cE6/tJ49nsqWAITojxXK','Altan','Avtzi','18-24','Male','Athens','Attica','Upper Secondary Education','<5.000','2023-02-16 19:53:33','2023-02-16 19:53:33'),(2,'user1','$2b$10$xW0xaGcOLRuWW676mqPt3uWfcaMEWZYwymBy/TOi1P0.0seYr8vg.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 19:53:33','2023-02-16 19:53:33'),(3,'user2','$2b$10$nG/1qMwXK.jUXPXXKAKbGe3bWB/ws8gdaxIvVR5tPy6L2JtC/6noS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 19:53:33','2023-02-16 19:53:33'),(4,'user3','$2b$10$HTuaTU5JfDXPPcxgOSlTdOHvmfCrWN6Gtel73vQ7T44gX2UdRi3Ne',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 19:53:33','2023-02-16 19:53:33'),(5,'user4','$2b$10$ESmxlFJJ49GmumzeLczWPeZjyPwbL2HruN84NT4HVlKJF9qeEUvQC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 19:53:33','2023-02-16 19:53:33'),(6,'user5','$2b$10$pM.wO6s3DLBaqeqEDjoEiOF2PqPXfSCbtyj7g40kMquruulJUXkDi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 19:53:33','2023-02-16 19:53:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 23:12:03
