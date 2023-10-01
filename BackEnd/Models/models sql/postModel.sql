use redhats;


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
