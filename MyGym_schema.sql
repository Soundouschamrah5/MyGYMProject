DROP SEQUENCE IF EXISTS users_userId_seq CASCADE;
DROP TABLE IF EXISTS users;
CREATE SEQUENCE users_userId_seq;
CREATE TABLE Users (
 UserId 			 int PRIMARY KEY default nextval('users_userId_seq'),
 User_Email          varchar(35) not null,
 User_Password       varchar(35) not null,
 User_Fname          varchar(35) not null,
 User_Lname          varchar(35) not null,
 User_Age            varchar(3) not null,
 Gender         varchar(10), CHECK(Gender = 'Male' or Gender = 'Female' or Gender = 'Other'),
 User_Height         char(3) not null, 
 User_Weight         varchar(3) not null,
 User_TrainingStatus varchar(15) not null, CHECK(User_TrainingStatus = 'Beginner'or User_TrainingStatus = 'Intermediate'or User_TrainingStatus = 'Advanced')
);