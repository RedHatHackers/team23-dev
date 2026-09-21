use redhats;

ALTER TABLE module
ADD price int not null; 
;

ALTER TABLE tutor
ADD isTutor varchar(1) default("N"); 
;

ALTer table tutor
add userId int not null;
ALTER TABLE tutor
add  foreign key(userId)  references users(Id);
;

drop table manager;


ALTER TABLE tutor
drop COLUMN academicRecord;

ALTER TABLE tutor
ADD academicRecord varbinary(8000) null;