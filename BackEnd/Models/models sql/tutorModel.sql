use redhats;


Create table Tutor(
    Id int not null AUTO_INCREMENT,
    qualification varchar(100) not null ,
    academicRecord varbinary(8000) not null ,
    experience varchar(250) not null ,

    primary key (Id)
);