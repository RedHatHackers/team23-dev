use redhats;

Create table Users(
  Id  int not null AUTO_INCREMENT,
  name varchar(100),
  surname varchar(100),
  username varchar(100),
  email varchar(100),
  password varchar(100),
  userType varchar(1) default 's',

  primary key (Id)
);
 
 Create table Tutor(
    Id int not null AUTO_INCREMENT,
    qualification varchar(100) not null ,
    academicRecord varbinary(8000) not null ,
    experience varchar(250) not null ,
	
     userId int NOT NULL,

    primary key (Id)
	,
     FOREIGN KEY (userId) REFERENCES users(Id)
);

Create table Student(
  Id int not null AUTO_INCREMENT,
  userId int not null,
  school varchar(100),
  qualification varchar(100),

  primary key (Id,userId),
  FOREIGN KEY (userId) REFERENCES users(Id)
);

 Create table manager(
     Id int NOT NULL AUTO_INCREMENT,
     userId int NOT NULL,

     PRIMARY KEY (Id),
     FOREIGN KEY (userId) REFERENCES users(Id)
);


Create table module(
  Id int not null AUTO_INCREMENT,
  name varchar(100) not  null,
  code varchar(10) not null,
  description varchar(200) not null,
  _date datetime default Now(),
  
  primary key(Id)
);


Create table userModule(
   userId int not null,
   moduleId int not null,
   _date datetime default Now(),
   primary key (userId,moduleId),
   
   FOREIGN KEY (moduleId) REFERENCES module(Id),
   FOREIGN KEY (userId) REFERENCES users(Id)
   );

Create table Post(
  Id int not null auto_increment,
  _date datetime default Now(),
  _comment varchar(250),
  _file varbinary(8000),
  likecount int default 0,
  moduleId int not null,
  tutorId int not null,

  PRIMARY KEY (Id,tutorId,moduleId),
  FOREIGN KEY (tutorId) REFERENCES tutor(Id),
  FOREIGN KEY (moduleId) REFERENCES module(Id)
);


CREATE TABLE studentTutor(
  studentId int NOT NULL,
  tutorId int NOT NULL,
  _date datetime default Now(),
  subcribed boolean default 0,


  PRIMARY KEY (studentId,tutorId),
  FOREIGN KEY (studentId) REFERENCES student(Id),
  FOREIGN KEY (tutorId) REFERENCES tutor(Id)
  );
  




CREATE TABLE Comment(
    Id int not null auto_increment,
    userId int NOT NULL,
    postId int NOT NULL,
    _date datetime default Now(),
    likeCount int default 0,
    comment varchar(300),

    PRIMARY KEY (Id,userId,postId),
    FOREIGN KEY (userId) REFERENCES users(Id),
    FOREIGN KEY (postId) REFERENCES post(Id)
 );