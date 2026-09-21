use redhats;


    Create table manager(
     Id int NOT NULL AUTO_INCREMENT,
     userId int NOT NULL,

     PRIMARY KEY (Id),
     FOREIGN KEY (userId) REFERENCES users(Id)
);