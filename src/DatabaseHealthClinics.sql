DROP TABLE IF EXISTS clinicconcerns;
DROP TABLE IF EXISTS health_concerns;
DROP TABLE IF EXISTS clinics;
CREATE DATABASE clinics_database;
USE clinics_database;


CREATE TABLE clinics (
clinic_id INT NOT NULL AUTO_INCREMENT,
clinic_name VARCHAR(255) NOT NULL,
clinic_type ENUM('NHS','Private') NOT NULL,
address VARCHAR(255) NOT NULL,
postcode VARCHAR(10) NOT NULL,
latitude DECIMAL(9,6),
longitude DECIMAL(9,6),
website VARCHAR(255),
phone_number VARCHAR(20),
PRIMARY KEY (clinic_id)
);

INSERT INTO clinics VALUES
(1,'Community Women''s Health Service (Barts Health)','NHS','Sylvia Pankhurst Centre, Mile End Hospital, Bancroft Road, London','E1 4DG',51.525049,-0.042179,'https://www.bartshealth.nhs.uk/womens-health-services','020 8223 8449'),
(2,'Oxleas Women''s and Girls'' Health Hub','NHS','Market Street Health Centre, Woolwich','SE18 6QR',51.489885,0.063847,'https://oxleas.nhs.uk/womens-and-girls-hub/','020 8301 8920'),
(3,'Queen Elizabeth Hospital Gynaecology Service','NHS','Stadium Road, Woolwich, London','SE18 4QH',51.478194,0.050069,'https://www.lewishamandgreenwich.nhs.uk/gynaecology','020 8836 4897'),
(4,'Wolfson Fertility Centre','NHS','Hammersmith Hospital, Du Cane Road, London','W12 0HS',51.517420,-0.234698,'https://www.imperial.nhs.uk/our-services/fertility-and-reproductive-medicine/ivf','020 3313 4411'),
(5,'Homerton Fertility Centre','NHS','Homerton University Hospital, Homerton Row, London','E9 6SR',51.550635,-0.046072,'https://www.homerton.nhs.uk/fertility-centre','020 8510 7660'),
(6,'Mortimer Market Centre Sexual Health Clinic London','NHS','Capper Street, London','WC1E 6JB',51.522722,-0.135518,'https://www.sexualhealth.cnwl.nhs.uk/clinic/mortimer-market-centre-including-margaret-pyke-centre/','020 3317 5252'),
(7,'Guy''s Assisted Conception Unit','NHS','Guy''s Hospital, Great Maze Pond, London','SE1 9RT',51.503331,-0.086771,'https://www.guysandstthomas.nhs.uk/our-services/assisted-conception-unit-acu','020 7188 2300'),
(8,'Camberwell Sexual Health Centre','NHS','Camberwell Building, 100 Denmark Hill, London','SE5 9RS',51.468078,-0.093890,'https://www.kch.nhs.uk/services/services-a-to-z/sexual-health/','020 3299 5091'),
(9,'Women''s Health, Welbeck London','Private','1 Welbeck Street, London','W1G 0AR',51.516185,-0.148094,'https://welbeck.com/specialist-centres/private-womens-health-clinic','020 3653 2008'),
(10,'London Gynaecology Moorgate Clinic','Private','15 Austin Friars, London','EC2N 2HE',51.515894,-0.085711,'https://www.london-gynaecology.com/','020 3989 4744'),
(11,'The Gynae Centre','Private','Suite 23, Milford House, 7 Queen Anne Street, London','W1G 9HN',51.518163,-0.145188,'https://www.gynae-centre.co.uk/','020 7580 8090'),
(12,'Gynaedoctors','Private','Floor 1, 121 Crawford Street, London','W1U 6BE',51.519889,-0.158293,'https://gynaedoctors.com/','07703 316677'),
(13,'Grosvenor Gardens Gynaecology - Belgravia','Private','2 Grosvenor Gardens, London','SW1W 0DH',51.497224,-0.147220,'https://gghealthcare.uk/','020 4540 3540'),
(14,'London Women''s Clinic London Bridge','Private','1 St Thomas Street, London','SE1 9RY',51.505000,-0.088229,'https://www.londonwomensclinic.com/','020 7563 4309'),
(15,'CRGH Great Portland Street','Private','230–232 Great Portland Street, London','W1W 5QS',51.522978,-0.143724,'https://crgh.co.uk/','020 7837 2905'),
(16,'IVI London - IVF Fertility Clinic UK','Private','83 Wimpole Street, London','W1G 9RQ',51.516991,-0.147874,'https://www.ivi.uk/clinics/london/','0808 239 5675'),
(17,'Clarewell Clinics','Private','9 Ivor Place, London','NW1 6BY',51.524418,-0.161498,'https://clarewellclinics.co.uk/','020 7390 0599'),
(18,'Ovara Health','Private','274 Fulham Road, Chelsea Walk, London','SW10 9EW',51.483929,-0.184962,'https://ovarahealth.co.uk/','020 7751 4488'),
(19,'Babyinc','Private','35 Devonshire Place, London','W1G 6JP',51.521869,-0.150386,'https://babyinc.co.uk/','020 7935 6500'),
(20,'Hormone Health','Private','OneWelbeck, 1 Welbeck Street, London','W1G 0AR',51.516185,-0.148094,'https://hormonehealth.co.uk/','0808 196 1901');


CREATE TABLE health_concerns (
concern_id INT NOT NULL,
concern_name VARCHAR(255) NOT NULL,
PRIMARY KEY (concern_id)
);

INSERT INTO health_concerns VALUES
(100,'Women''s general health'),
(101,'Family planning and contraception'),
(102,'Sexual health'),
(103,'Fertility support'),
(104,'Pregnancy and maternity care'),
(105,'Menopause support');


CREATE TABLE clinicconcerns (
  clinic_id INT NOT NULL,
  concern_id INT NOT NULL,
  PRIMARY KEY (clinic_id, concern_id),
  FOREIGN KEY (clinic_id)
    REFERENCES clinics (clinic_id),
  FOREIGN KEY (concern_id)
    REFERENCES health_concerns (concern_id)
);
INSERT INTO clinicconcerns VALUES
(3,100),
(9,100),
(11,100),
(12,100),
(13,100),
(18,100),
(20,100),
(1,101),
(2,101),
(8,101),
(9,101),
(10,101),
(11,101),
(12,101),
(17,101),
(6,102),
(8,102),
(11,102),
(12,102),
(17,102),
(2,103),
(3,103),
(4,103),
(5,103),
(7,103),
(10,103),
(13,103),
(14,103),
(15,103),
(16,103),
(18,103),
(19,103),
(9,104),
(12,104),
(13,104),
(1,105),
(2,105),
(3,105),
(10,105),
(11,105),
(12,105),
(18,105),
(19,105),
(20,105);


SELECT * FROM clinicconcerns;