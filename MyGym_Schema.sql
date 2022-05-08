CREATE SEQUENCE users_userId_seq;
CREATE TABLE Users (
 UserId 			 int PRIMARY KEY default nextval('users_userId_seq'),
 User_Email          varchar(35) not null,
 User_Password       varchar(35) not null,
 User_Fname          varchar(35) not null,
 User_Lname          varchar(35) not null,
 User_Age            varchar(3) not null,
 Gender         char(1), CHECK(Gender = 'M' or Gender = 'F'),
 User_Height         char(3) not null, 
 User_Weight         varchar(3) not null,
 User_TrainingStatus char(1) not null, CHECK(User_TrainingStatus = 'B'or User_TrainingStatus = 'I'or User_TrainingStatus = 'A')
);