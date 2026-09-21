 use redhats;

Create table userModule(
   userId int not null,
   moduleId int not null,
   _date datetime default Now(),
   primary key (userId,moduleId),
   
   FOREIGN KEY (moduleId) REFERENCES module(Id),
   FOREIGN KEY (userId) REFERENCES users(Id)
   );