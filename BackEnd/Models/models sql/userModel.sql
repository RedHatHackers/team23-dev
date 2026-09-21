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
