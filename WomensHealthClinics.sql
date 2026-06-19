create database WomensHealthFinder;
use WomensHealthFinder;

-- Table for the clinics
create table Clinics (
clinic_id INT auto_increment primary key,
clinic_name VARCHAR(255),
clinic_type ENUM('NHS', 'Private'),
address VARCHAR(255),
postcode VARCHAR(10),
latitude DECIMAL(9,6),
longitude DECIMAL(9,6),
website VARCHAR(255),
phone_number VARCHAR(20)
);

use WomensHealthFinder;

select * from clinics;

-- Table for health concerns
create table Health_Concerns (
concern_name VARCHAR(255),
concern_id INT primary key 
);

-- Junction table for health concerns and clinics
create table ClinicConcerns (
clinic_id INT not null,
concern_id INT not null,
primary key (clinic_id, concern_id),
foreign key (clinic_id) references Clinics(clinic_id),
foreign key (concern_id) references Health_Concerns(concern_id)
);