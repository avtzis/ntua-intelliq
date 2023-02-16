-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: intelliQ
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
INSERT INTO `Survey_Keyword` VALUES ('2023-02-16 20:10:14','2023-02-16 20:10:14',1,1),('2023-02-16 20:10:14','2023-02-16 20:10:14',1,2),('2023-02-16 20:10:14','2023-02-16 20:10:14',1,3),('2023-02-16 20:10:14','2023-02-16 20:10:14',1,4),('2023-02-16 20:10:14','2023-02-16 20:10:14',1,5),('2023-02-16 20:40:36','2023-02-16 20:40:36',2,1),('2023-02-16 20:40:36','2023-02-16 20:40:36',2,6),('2023-02-16 20:50:26','2023-02-16 20:50:26',3,7),('2023-02-16 20:50:26','2023-02-16 20:50:26',3,8),('2023-02-16 20:50:26','2023-02-16 20:50:26',3,9),('2023-02-16 20:53:43','2023-02-16 20:53:43',4,10);
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
INSERT INTO `administrators` VALUES (1,'admin','$2b$10$XKI8m7glVIlSHNevr71.DudNgn9VOLb70Z43JFnG04mV0auOTb1Wa','softlab','Altan','Avtzi','18-24','Male','Athens','Attica','Upper Secondary Education','<5.000','2023-02-16 19:54:23','2023-02-16 19:54:23');
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,'Ποδόσφαιρο',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,2),(2,'Μπάσκετ',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,2),(3,'Τέννις',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,2),(4,'Ναι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',2,3),(5,'Όχι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',2,4),(6,'1',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',3,5),(7,'2',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',3,5),(8,'3',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',3,5),(9,'4+',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',3,5),(10,'Είμαι πολύ νέος ακόμα',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',4,6),(11,'Δεν μου αρέσουν τα παιδιά',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',4,8),(12,'Δεν έχω την οικονομική άνεση',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',4,6),(13,'Ναι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',5,7),(14,'Όχι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',5,7),(15,'Ναι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',6,7),(16,'Όχι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',6,8),(17,'1',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',7,8),(18,'2',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',7,8),(19,'3',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',7,8),(20,'4+',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',7,8),(21,'Φθινόπωρο',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',8,9),(22,'Χειμώνας',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',8,9),(23,'Άνοιξη',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',8,9),(24,'Καλοκαίρι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',8,9),(25,'Κόκκινο',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',9,10),(26,'Πράσινο',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',9,10),(27,'Μπλε',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',9,10),(28,'Σκύλος',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',10,NULL),(29,'Γάτα',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',10,NULL),(30,'Παπαγάλος',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',10,NULL),(31,'Κουνέλι',NULL,NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',10,NULL),(32,'Ναι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',11,12),(33,'Όχι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',11,NULL),(34,'Επαγγελματικά',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',12,13),(35,'Σαν χόμπι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',12,14),(36,'Δεν αθλούμαι ιδιαίτερα, απλά παρακολουθώ αθλήματα',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',12,16),(37,'<1',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',13,15),(38,'1-3',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',13,15),(39,'3+',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',13,15),(40,'Ναι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',14,15),(41,'Όχι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',14,15),(42,'Ναι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',15,16),(43,'Όχι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',15,17),(44,'Τύπου ποδόσφαιρο, μπάσκετ, κλπ...',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',16,17),(45,'Τύπου ολυμπιακών αγώνων',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',16,17),(46,'Ναι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',17,18),(47,'Όχι',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',17,18),(48,'Από κοντά',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',18,NULL),(49,'Από οθόνη',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',18,19),(50,'Κανένα από τα δύο',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',18,NULL),(51,'Τηλεόραση',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',19,NULL),(52,'Ίντερνετ',NULL,NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',19,NULL),(53,'<open string>',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',20,21),(54,'<30',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',21,22),(55,'30-50',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',21,22),(56,'50-70',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',21,22),(57,'>70',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',21,22),(58,'Πράσινο',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',22,23),(59,'Κόκκινο',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',22,23),(60,'Κίτρινο',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',22,23),(61,'Μπλε',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',22,23),(62,'Ναι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',23,24),(63,'Όχι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',23,25),(64,'Ολυμπιακός',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',24,25),(65,'Παναθηναϊκός',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',24,25),(66,'ΑΕΚ',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',24,25),(67,'Ναι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',25,26),(68,'Όχι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',25,27),(69,'Καμία',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',26,27),(70,'Μικρή',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',26,27),(71,'Μεγάλη',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',26,27),(72,'Ναι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',27,28),(73,'Όχι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',27,28),(74,'Σπάνια - καθόλου',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',28,29),(75,'Περιστασιακά',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',28,29),(76,'Τακτικά',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',28,29),(77,'Ναι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',29,30),(78,'Όχι',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',29,NULL),(79,'Θερινή',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',30,NULL),(80,'Χειμερινή',NULL,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',30,NULL),(81,'<open string>',NULL,NULL,'2023-02-16 20:53:43','2023-02-16 20:53:43',31,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
INSERT INTO `keywords` VALUES (1,'sports','2023-02-16 20:10:14','2023-02-16 20:10:14'),(2,'kids','2023-02-16 20:10:14','2023-02-16 20:10:14'),(3,'colours','2023-02-16 20:10:14','2023-02-16 20:10:14'),(4,'seasons','2023-02-16 20:10:14','2023-02-16 20:10:14'),(5,'pets','2023-02-16 20:10:14','2023-02-16 20:10:14'),(6,'hobbies','2023-02-16 20:40:36','2023-02-16 20:40:36'),(7,'football','2023-02-16 20:50:26','2023-02-16 20:50:26'),(8,'islands','2023-02-16 20:50:26','2023-02-16 20:50:26'),(9,'timezone','2023-02-16 20:50:26','2023-02-16 20:50:26'),(10,'dummy','2023-02-16 20:53:43','2023-02-16 20:53:43');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionnaires`
--

LOCK TABLES `questionnaires` WRITE;
/*!40000 ALTER TABLE `questionnaires` DISABLE KEYS */;
INSERT INTO `questionnaires` VALUES (1,'Demo Survey','This survey was used during this project\'s demonstration/examination at the end of 2022-2023 winter semester.',1,NULL,'2023-02-16 20:10:14','2023-02-16 20:11:30',1,1),(2,'Sport Stars','This survey is about sports and hobbies.',1,NULL,'2023-02-16 20:40:36','2023-02-16 20:41:06',1,11),(3,'My first research questionnaire','This survey was inspired by the sample questionnaire that was given as an example for this project.',1,NULL,'2023-02-16 20:50:26','2023-02-16 20:50:41',1,20),(4,'An unpublished survey','This survey\'s purpose is to populate the unpublished part of the surveys section.',0,NULL,'2023-02-16 20:53:43','2023-02-16 20:53:43',1,31);
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Ποιο είναι το αγαπημένο σας άθλημα;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(2,'Έχετε παιδιά;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(3,'Πόσα παιδιά έχετε;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(4,'Ποιος είναι ο λόγος που δεν έχετε (ακόμα) παιδιά;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(5,'Σκοπεύετε να αποκτήσετε περισσότερα παιδιά;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(6,'Σκοπεύετε να αποκτήσετε κάποια στιγμή στης ζωής σας παιδιά;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(7,'Πόσα παιδιά θα θέλατε να έχετε;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(8,'Ποια είναι η αγαπημένη σας εποχή;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(9,'Ποιο είναι το αγαπημένο σας χρώμα;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(10,'Ποιο πιστεύετε είναι το ιδανικό κατοικίδιο για το σπίτι;','true','question','options',NULL,'2023-02-16 20:10:14','2023-02-16 20:10:14',1,NULL),(11,'Ασχολείστε με τον αθλητισμό;','true','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,NULL),(12,'Με ποιον τρόπο ασχολείστε;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,15),(13,'Πόσα χρόνια εργάζεστε στον αθλητικό τομέα;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,15),(14,'Σκέφτεστε να ασχοληθείτε επαγγελματικά αν υπάρχει η δυνατότητα;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,15),(15,'Παρακολουθείτε αθλήματα στην τηλεόραση/Ίντερνετ;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,17),(16,'Τι είδος αθλήματα προτιμάτε να παρακολουθείτε;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,17),(17,'Παρακολουθείτε αθλήματα από κοντά; (πχ στο γήπεδο)','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,18),(18,'Προτιμάτε πιο πολύ από κόντα ή από οθόνη;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,NULL),(19,'Προτιμάτε την τηλεόραση ή το Ίντερνετ όσον αφορά την παρακολούθηση αθλημάτων;','false','question','options',NULL,'2023-02-16 20:40:36','2023-02-16 20:40:36',2,NULL),(20,'Ποιο είναι το email σας;','false','profile','open text',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,21),(21,'Ποια είναι η ηλικία σας;','false','profile','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,22),(22,'Ποιο είναι το αγαπημένο σας χρώμα;','true','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(23,'Ασχολείστε με το ποδόσφαιρο;','false','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,25),(24,'Τι ομάδα είστε;','true','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(25,'Έχετε ζήσει σε νησί;','false','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,27),(26,'Ποια είναι η σχέση σας με το θαλάσσιο σκι;','true','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(27,'Είστε χειμερινός κολυμβητής;','false','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,28),(28,'Κάνετε χειμερινό σκι;','true','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(29,'Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;','false','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(30,'Προτιμάτε τη θερινή ή την χειμερινή ώρα;','true','question','options',NULL,'2023-02-16 20:50:26','2023-02-16 20:50:26',3,NULL),(31,'Open question, say whatever you want.','true','question','open text',NULL,'2023-02-16 20:53:43','2023-02-16 20:53:43',4,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `researchers`
--

DROP TABLE IF EXISTS `researchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `researchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `corporation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `username_6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `researchers`
--

LOCK TABLES `researchers` WRITE;
/*!40000 ALTER TABLE `researchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `researchers` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'1','1',NULL,'2023-02-16 20:55:03','2023-02-16 20:55:47',2,1,10),(2,'1','1',NULL,'2023-02-16 20:56:00','2023-02-16 20:56:43',2,2,18),(3,'1','1',NULL,'2023-02-16 20:56:48','2023-02-16 20:57:31',2,3,30),(4,'1','1',NULL,'2023-02-16 20:57:47','2023-02-16 20:58:33',3,1,10),(5,'1','1',NULL,'2023-02-16 20:58:37','2023-02-16 20:59:05',3,2,18),(6,'1','1',NULL,'2023-02-16 20:59:08','2023-02-16 21:00:05',3,3,29),(7,'1','1',NULL,'2023-02-16 21:00:27','2023-02-16 21:00:56',4,1,10),(8,'1','1',NULL,'2023-02-16 21:00:59','2023-02-16 21:01:07',4,2,11),(9,'1','1',NULL,'2023-02-16 21:01:13','2023-02-16 21:02:05',4,3,30),(10,'1','1',NULL,'2023-02-16 21:02:30','2023-02-16 21:02:50',5,1,10),(11,'1','1',NULL,'2023-02-16 21:03:03','2023-02-16 21:03:31',5,2,18),(12,'1','1',NULL,'2023-02-16 21:03:35','2023-02-16 21:04:04',5,3,29);
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
INSERT INTO `tokens` VALUES (7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjc2NTgxNDUxLCJleHAiOjE2NzY2MTM4NTF9.Rukyl1NykN60rfTwL7DqW04f--91WsRUqpiM9Xqdt4s','admin','admin','2023-02-16 21:04:11','2023-02-16 21:04:11',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uniqueAnswers`
--

LOCK TABLES `uniqueAnswers` WRITE;
/*!40000 ALTER TABLE `uniqueAnswers` DISABLE KEYS */;
INSERT INTO `uniqueAnswers` VALUES (1,'Ποδόσφαιρο','false',1,'2023-02-16 20:55:07','2023-02-16 20:55:07',1,1),(2,'Ναι','false',2,'2023-02-16 20:55:11','2023-02-16 20:55:11',4,1),(3,'4+','false',3,'2023-02-16 20:55:14','2023-02-16 20:55:14',9,1),(4,'Όχι','false',5,'2023-02-16 20:55:18','2023-02-16 20:55:18',14,1),(5,'1','false',7,'2023-02-16 20:55:23','2023-02-16 20:55:23',17,1),(6,'Φθινόπωρο','false',8,'2023-02-16 20:55:31','2023-02-16 20:55:31',21,1),(7,'Μπλε','false',9,'2023-02-16 20:55:39','2023-02-16 20:55:39',27,1),(8,'Παπαγάλος','false',10,'2023-02-16 20:55:45','2023-02-16 20:55:45',30,1),(9,'Ναι','false',11,'2023-02-16 20:56:04','2023-02-16 20:56:04',32,2),(10,'Δεν αθλούμαι ιδιαίτερα, απλά παρακολουθώ αθλήματα','false',12,'2023-02-16 20:56:11','2023-02-16 20:56:11',36,2),(11,'Τύπου ποδόσφαιρο, μπάσκετ, κλπ...','false',16,'2023-02-16 20:56:16','2023-02-16 20:56:17',44,2),(12,'Ναι','false',17,'2023-02-16 20:56:35','2023-02-16 20:56:35',46,2),(13,'Από κοντά','false',18,'2023-02-16 20:56:40','2023-02-16 20:56:40',48,2),(14,'avtzialtan@hotmail.com','false',20,'2023-02-16 20:56:56','2023-02-16 20:56:56',53,3),(15,'50-70','false',21,'2023-02-16 20:56:59','2023-02-16 20:56:59',56,3),(16,'Μπλε','false',22,'2023-02-16 20:57:02','2023-02-16 20:57:02',61,3),(17,'Ναι','false',23,'2023-02-16 20:57:07','2023-02-16 20:57:07',62,3),(18,'Ολυμπιακός','false',24,'2023-02-16 20:57:09','2023-02-16 20:57:09',64,3),(19,'Ναι','false',25,'2023-02-16 20:57:12','2023-02-16 20:57:12',67,3),(20,'Μικρή','false',26,'2023-02-16 20:57:15','2023-02-16 20:57:15',70,3),(21,'Όχι','false',27,'2023-02-16 20:57:19','2023-02-16 20:57:19',73,3),(22,'Σπάνια - καθόλου','false',28,'2023-02-16 20:57:23','2023-02-16 20:57:23',74,3),(23,'Ναι','false',29,'2023-02-16 20:57:26','2023-02-16 20:57:26',77,3),(24,'Χειμερινή','false',30,'2023-02-16 20:57:29','2023-02-16 20:57:29',80,3),(25,'Μπάσκετ','false',1,'2023-02-16 20:57:50','2023-02-16 20:57:50',2,4),(26,'Όχι','false',2,'2023-02-16 20:57:52','2023-02-16 20:57:52',5,4),(27,'Είμαι πολύ νέος ακόμα','false',4,'2023-02-16 20:57:57','2023-02-16 20:57:57',10,4),(28,'Ναι','false',6,'2023-02-16 20:58:01','2023-02-16 20:58:01',15,4),(29,'4+','false',7,'2023-02-16 20:58:06','2023-02-16 20:58:06',20,4),(30,'Άνοιξη','false',8,'2023-02-16 20:58:24','2023-02-16 20:58:25',23,4),(31,'Πράσινο','false',9,'2023-02-16 20:58:27','2023-02-16 20:58:27',26,4),(32,'Σκύλος','false',10,'2023-02-16 20:58:31','2023-02-16 20:58:31',28,4),(33,'Ναι','false',11,'2023-02-16 20:58:40','2023-02-16 20:58:40',32,5),(34,'Επαγγελματικά','false',12,'2023-02-16 20:58:42','2023-02-16 20:58:42',34,5),(35,'3+','false',13,'2023-02-16 20:58:46','2023-02-16 20:58:46',39,5),(36,'Ναι','false',15,'2023-02-16 20:58:49','2023-02-16 20:58:49',42,5),(37,'Τύπου ποδόσφαιρο, μπάσκετ, κλπ...','false',16,'2023-02-16 20:58:53','2023-02-16 20:58:53',44,5),(38,'Ναι','false',17,'2023-02-16 20:58:56','2023-02-16 20:58:56',46,5),(39,'Από κοντά','false',18,'2023-02-16 20:59:01','2023-02-16 20:59:01',48,5),(40,'cr7@mail.com','false',20,'2023-02-16 20:59:35','2023-02-16 20:59:35',53,6),(41,'30-50','false',21,'2023-02-16 20:59:38','2023-02-16 20:59:38',55,6),(42,'Κίτρινο','false',22,'2023-02-16 20:59:44','2023-02-16 20:59:44',60,6),(43,'Ναι','false',23,'2023-02-16 20:59:50','2023-02-16 20:59:50',62,6),(44,'ΑΕΚ','false',24,'2023-02-16 20:59:54','2023-02-16 20:59:54',66,6),(45,'Όχι','false',25,'2023-02-16 20:59:57','2023-02-16 20:59:57',68,6),(46,'Όχι','false',27,'2023-02-16 20:59:59','2023-02-16 20:59:59',73,6),(47,'Τακτικά','false',28,'2023-02-16 21:00:02','2023-02-16 21:00:02',76,6),(48,'Όχι','false',29,'2023-02-16 21:00:04','2023-02-16 21:00:04',78,6),(49,'Τέννις','false',1,'2023-02-16 21:00:30','2023-02-16 21:00:30',3,7),(50,'Ναι','false',2,'2023-02-16 21:00:35','2023-02-16 21:00:35',4,7),(51,'2','false',3,'2023-02-16 21:00:37','2023-02-16 21:00:37',7,7),(52,'Ναι','false',5,'2023-02-16 21:00:40','2023-02-16 21:00:40',13,7),(53,'3','false',7,'2023-02-16 21:00:43','2023-02-16 21:00:43',19,7),(54,'Καλοκαίρι','false',8,'2023-02-16 21:00:46','2023-02-16 21:00:46',24,7),(55,'Κόκκινο','false',9,'2023-02-16 21:00:50','2023-02-16 21:00:50',25,7),(56,'Γάτα','false',10,'2023-02-16 21:00:55','2023-02-16 21:00:55',29,7),(57,'Όχι','false',11,'2023-02-16 21:01:04','2023-02-16 21:01:04',33,8),(58,'john@gmail.com','false',20,'2023-02-16 21:01:33','2023-02-16 21:01:33',53,9),(59,'<30','false',21,'2023-02-16 21:01:39','2023-02-16 21:01:40',54,9),(60,'Κόκκινο','false',22,'2023-02-16 21:01:42','2023-02-16 21:01:42',59,9),(61,'Όχι','false',23,'2023-02-16 21:01:47','2023-02-16 21:01:48',63,9),(62,'Ναι','false',25,'2023-02-16 21:01:49','2023-02-16 21:01:49',67,9),(63,'Μεγάλη','false',26,'2023-02-16 21:01:51','2023-02-16 21:01:51',71,9),(64,'Ναι','false',27,'2023-02-16 21:01:54','2023-02-16 21:01:54',72,9),(65,'Περιστασιακά','false',28,'2023-02-16 21:01:58','2023-02-16 21:01:58',75,9),(66,'Ναι','false',29,'2023-02-16 21:02:00','2023-02-16 21:02:00',77,9),(67,'Θερινή','false',30,'2023-02-16 21:02:03','2023-02-16 21:02:03',79,9),(68,'Ποδόσφαιρο','false',1,'2023-02-16 21:02:34','2023-02-16 21:02:34',1,10),(69,'Όχι','false',2,'2023-02-16 21:02:36','2023-02-16 21:02:36',5,10),(70,'Δεν μου αρέσουν τα παιδιά','false',4,'2023-02-16 21:02:40','2023-02-16 21:02:40',11,10),(71,'Καλοκαίρι','false',8,'2023-02-16 21:02:43','2023-02-16 21:02:43',24,10),(72,'Πράσινο','false',9,'2023-02-16 21:02:46','2023-02-16 21:02:46',26,10),(73,'Σκύλος','false',10,'2023-02-16 21:02:49','2023-02-16 21:02:49',28,10),(74,'Ναι','false',11,'2023-02-16 21:03:07','2023-02-16 21:03:07',32,11),(75,'Σαν χόμπι','false',12,'2023-02-16 21:03:15','2023-02-16 21:03:15',35,11),(76,'Ναι','false',14,'2023-02-16 21:03:18','2023-02-16 21:03:18',40,11),(77,'Όχι','false',15,'2023-02-16 21:03:23','2023-02-16 21:03:23',43,11),(78,'Ναι','false',17,'2023-02-16 21:03:27','2023-02-16 21:03:27',46,11),(79,'Από κοντά','false',18,'2023-02-16 21:03:29','2023-02-16 21:03:29',48,11),(80,NULL,'true',20,'2023-02-16 21:03:40','2023-02-16 21:03:40',NULL,12),(81,'<30','false',21,'2023-02-16 21:03:47','2023-02-16 21:03:47',54,12),(82,'Κόκκινο','false',22,'2023-02-16 21:03:50','2023-02-16 21:03:50',59,12),(83,'Ναι','false',23,'2023-02-16 21:03:53','2023-02-16 21:03:53',62,12),(84,'Ολυμπιακός','false',24,'2023-02-16 21:03:55','2023-02-16 21:03:55',64,12),(85,'Όχι','false',25,'2023-02-16 21:03:57','2023-02-16 21:03:57',68,12),(86,'Όχι','false',27,'2023-02-16 21:03:58','2023-02-16 21:03:58',73,12),(87,'Σπάνια - καθόλου','false',28,'2023-02-16 21:04:01','2023-02-16 21:04:01',74,12),(88,'Όχι','false',29,'2023-02-16 21:04:03','2023-02-16 21:04:03',78,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user','$2b$10$Z8YBSiRASf92VHCgEW7c5O1ScdJz67Gsu7s2aq2dfwwZdFisUbhqS','Altan','Avtzi','18-24','Male','Athens','Attica','Upper Secondary Education','<5.000','2023-02-16 19:54:23','2023-02-16 19:54:23'),(2,'user1','$2b$10$qu6mD835FTGWxAx3KAxJzuE3zrBa2HJPiWrhGilVpmu.pkE.a28/C','','',NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 20:54:56','2023-02-16 20:54:56'),(3,'user2','$2b$10$wwfAft9h/cGMTOJdwMMezunZvJTjbbKTI5zm2cc7iJDgRsAC4eBgq','','',NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 20:57:40','2023-02-16 20:57:40'),(4,'user5','$2b$10$4066OEdo5Nfk8CAbrNoGoOt1xRQsQ/hyb.dmDyE9Hx2bEuM.LP.NO','','',NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 21:00:21','2023-02-16 21:00:21'),(5,'user8','$2b$10$9WE35O9/N7ElpGVnbRwwkOk7uQ2U25yI3zChhLzS35BJgGu9c.y0y','','',NULL,NULL,NULL,NULL,NULL,NULL,'2023-02-16 21:02:13','2023-02-16 21:02:13');
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

-- Dump completed on 2023-02-16 23:10:36
