use redHats;
CREATE TABLE `schooldocs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `moduleId` int NOT NULL,
  `studentId` int NOT NULL,
  `file` longtext,
  `fileName` varchar(100) DEFAULT NULL,
  `fileDescription` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `moduleId` (`moduleId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `schooldocs_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module` (`Id`),
  CONSTRAINT `schooldocs_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `bridgemts` (
  `moduleCode` int NOT NULL,
  `studentId` int NOT NULL,
  `tutorID` int NOT NULL,
  PRIMARY KEY (`studentId`,`tutorID`,`moduleCode`),
  KEY `tutorID` (`tutorID`),
  KEY `moduleCode` (`moduleCode`),
  CONSTRAINT `bridgemts_ibfk_1` FOREIGN KEY (`tutorID`) REFERENCES `tutor` (`Id`),
  CONSTRAINT `bridgemts_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`Id`),
  CONSTRAINT `bridgemts_ibfk_3` FOREIGN KEY (`moduleCode`) REFERENCES `module` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `tasksumbission` (
  `taskId` int NOT NULL,
  `studentId` int NOT NULL,
  `document` longtext NOT NULL,
  `_date` date DEFAULT NULL,
  `documentName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`taskId`,`studentId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `tasksumbission_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`Id`),
  CONSTRAINT `tasksumbission_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`taskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `tasks` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `moduleCode` int NOT NULL,
  `tutorID` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `duedate` date NOT NULL,
  `taskDocument` longtext,
  PRIMARY KEY (`taskId`,`tutorID`,`moduleCode`),
  KEY `tutorID` (`tutorID`),
  KEY `moduleCode` (`moduleCode`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`tutorID`) REFERENCES `tutor` (`Id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`moduleCode`) REFERENCES `module` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `studentmodule` (
  `moduleCode` int NOT NULL,
  `studentId` int NOT NULL,
  `paid` tinyint(1) DEFAULT '0',
  `pop` longtext,
  PRIMARY KEY (`moduleCode`,`studentId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `studentmodule_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`Id`),
  CONSTRAINT `studentmodule_ibfk_2` FOREIGN KEY (`moduleCode`) REFERENCES `module` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `tutor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `qualification` varchar(100) NOT NULL,
  `experience` varchar(250) NOT NULL,
  `isTutor` varchar(1) DEFAULT (_utf8mb4'N'),
  `userId` int DEFAULT NULL,
  `academicRecord` varbinary(8000) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `userId` (`userId`),
  CONSTRAINT `tutor_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `tutormodule` (
  `moduleCode` int NOT NULL,
  `tutorId` int NOT NULL,
  PRIMARY KEY (`moduleCode`,`tutorId`),
  KEY `tutorId` (`tutorId`),
  CONSTRAINT `tutormodule_ibfk_1` FOREIGN KEY (`tutorId`) REFERENCES `tutor` (`Id`),
  CONSTRAINT `tutormodule_ibfk_2` FOREIGN KEY (`moduleCode`) REFERENCES `module` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci