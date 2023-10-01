use redhats;


CREATE TABLE studentTutor(
  studentId int NOT NULL,
  tutorId int NOT NULL,
  _date datetime default Now(),
  subcribed boolean default 0,


  PRIMARY KEY (studentId,tutorId),
  FOREIGN KEY (studentId) REFERENCES student(Id),
  FOREIGN KEY (tutorId) REFERENCES tutor(Id)
  );
