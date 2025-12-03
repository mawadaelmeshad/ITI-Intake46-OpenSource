CREATE DATABASE lab2_db;
USE lab2_db;

CREATE TABLE Department (
    Dname VARCHAR(50),
    DNum INT PRIMARY KEY,
    MGRSSN CHAR(6),
    MGRStartDate DATE
);

create table Employee (
	Fname varchar(20) not null,
    Lname varchar(20) not null,
    SSN char(6) primary key,
    BDate date,
    Address varchar(100),
    Sex char(1),
    Salary int,
    Superssn char(6),
    Dno int,
    foreign key (superssn) references Employee(ssn) on update cascade  on delete set null,
    foreign key (Dno) references Department(Dnum) on update cascade  on delete set null
);

create table Project (
    Pname VARCHAR(50),
    Pnumber INT PRIMARY KEY,
    Plocation VARCHAR(50),
    City VARCHAR(30),
    Dnum INT,
    FOREIGN KEY (Dnum) REFERENCES Department(DNum) on update cascade  on delete set null
);

CREATE TABLE Works_for (
    ESSN CHAR(6),
    Pno INT,
    Hours DECIMAL(4,1),
    PRIMARY KEY (ESSN, Pno),
    FOREIGN KEY (ESSN) REFERENCES Employee(SSN) on update cascade,
    FOREIGN KEY (Pno) REFERENCES Project(Pnumber) on update cascade
);

CREATE TABLE Dependent (
    ESSN CHAR(6),
    Dependent_name VARCHAR(50),
    Sex CHAR(1),
    Bdate DATE,
    PRIMARY KEY (ESSN, Dependent_name),
    FOREIGN KEY (ESSN) REFERENCES Employee(SSN) on update cascade 
);

INSERT INTO Department VALUES ('DP1', 10, '223344', '2005-01-01');
INSERT INTO Department VALUES ('DP2', 20, '968574', '2006-03-01');
INSERT INTO Department VALUES ('DP3', 30, '512463', '2006-06-01');

INSERT INTO Employee VALUES ('Ahmed', 'Ali', '112233', '1965-01-01', '15 Ali fahmy St.Giza', 'M', 1300, null, 10);
INSERT INTO Employee VALUES ('Kamel', 'Mohamed', '223344', '1970-10-15', '38 Mohy el dien abo el Ezz St.Cairo', 'M', 1800, '112233', 10);
INSERT INTO Employee VALUES ('Hanaa', 'Sobhy', '123456', '1973-03-18', '38 Abdel Khalik Tharwat St. Downtown.Cairo', 'F', 800, '223344', 10);

INSERT INTO Project VALUES ('AL Solimaniah', 100, 'Cairo_Alex Road', 'Alex', 10);
INSERT INTO Works_for VALUES ('223344',100,10);
INSERT INTO Dependent VALUES ('223344', 'Ahmed Kamel Shawki', 'M', '1998-03-27');

insert into Employee (Fname, Lname, SSN, BDate , Address, Sex, Salary, Superssn, Dno)
Values ('Mawadah', 'Elmashad', '102672' , '2003-05-14', '12 Adlaqahlya' , 'F', 5000 , '112233', 30);
SELECT * FROM Employee;
insert into Employee (Fname, Lname, SSN, BDate, Address, Sex, Dno)
values ('Maryam' ,'Ali', '102673', '2003-11-12', '40 Giza' , 'F', 30);

insert into Department values ('DEPT IT', 100 , '112233' , '2006-11-01');
update Department Set MGRSSN = '968574', MGRStartDate = CURDATE() Where DNum = 100;
UPDATE Department SET MGRSSN = '102672', MGRStartDate = CURDATE() WHERE DNum = 20;
SELECT * FROM Department;
update Employee SET Superssn = '102672' WHERE SSN = '102673';
update Department SET MGRSSN = NULL WHERE MGRSSN = '223344';
update Employee SET Salary = Salary * 1.20 WHERE SSN = '102672';
SELECT * FROM Employee;
SELECT Fname, Lname, Salary, Dno FROM Employee;
SELECT Pname, Plocation, Dname FROM Project p JOIN Department d ON p.Dnum = d.DNum;

SELECT concat(Fname,' ',Lname) As Full_Name, Salary*12*0.10 As `ANNUAL COMM` from Employee;

SELECT SSN, CONCAT(Fname,' ',Lname) AS Name FROM Employee where Salary > 1000;

select SSN, CONCAT(Fname,' ',Lname) as Name from Employee where Salary*12 > 10000;

select concat(Fname,' ',Lname) as Name, Salary from Employee where Sex = 'F';

select DNum, Dname from Department where MGRSSN = '968574';
select pnumber, pname , plocation from Project where Dnum=10;

-- lab-3
select d.Dnum, d.Dname , concat(e.Fname,' ', e.Lname) from department d 
left join Employee e on d.MGRSSN = e.ssn; 

select d.Dnum, d.Dname from department d where d.Dnum in(select Dnum from project p);
select d.ESSN, e.Fname , e.Lname, d.Sex, d.Bdate from Dependent d join employee e on d.ESSN = e.SSN;
select * from employee e where e.SSN in ( select MGRSSN from department );
select p.Pnumber, p.Pname , p.Plocation from project p where p.City in ('Cairo','Alex');
select * from project p where p.Pname like 'A%'; 
select * from project;
select * from employee;
select * from employee e where e.Dno =30 and e.salary between 1000 and 2000;
select * from project;
select e.Fname, e.Lname from employee e , works_for w, Project P where e.SSN = w.ESSN and w.Pno = p.Pnumber and p.Pname = 'AL Solimaniah' and w.Hours>=10;
select e.Fname , e.Lname from employee e where e.superssn = '223344';
select p.Pname, sum(w.Hours) as 'Total hours' from project p, works_for w where p.Pnumber = w.Pno group by p.Pname; 
select e.Lname from employee e where e.SSN in (select MGRSSN from department where MGRSSN is not null) and
e.SSN not in (select ESSN from dependent);
select * from dependent;
select * from department d where MGRSSN = (select min(MGRSSN) from department);
select e.fname , p.Pname 
from employee e,project p , works_for w
where  w.Pno = p.Pnumber and  p.Pname is not null and e.essn=w.essn;