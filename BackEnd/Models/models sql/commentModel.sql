use redhats;

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


