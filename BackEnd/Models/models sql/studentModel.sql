use redhats;


Create table Student(
  Id int not null AUTO_INCREMENT,
  userId int not null,
  school varchar(100),
  qualification varchar(100),

  primary key (Id,userId),
  FOREIGN KEY (userId) REFERENCES users(Id)
);
