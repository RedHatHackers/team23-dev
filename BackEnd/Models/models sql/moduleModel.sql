use redhats;


Create table module(
  Id int not null AUTO_INCREMENT,
  name varchar(100) not  null,
  code varchar(10) not null,
  description varchar(200) not null,
  _date datetime default Now(),
  
  primary key(Id)
);