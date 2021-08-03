CREATE TABLE `methods` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `number` varchar(50) NOT NULL,
  `revision` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(100),
  `note` text,
  `active` boolean NOT NULL,
  `file` blob,
  `method_text` longtext
);

CREATE TABLE `test_sheets` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `method` int,
  `active` boolean NOT NULL,
  `description` varchar(100),
  `note` text
);

CREATE TABLE `test_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `test_sheet` int,
  `description` varchar(100) NOT NULL,
  `nominal` varchar(20) NOT NULL,
  `low` varchar(20),
  `high` varchar(20),
  `unit` varchar(20) NOT NULL,
  `resolution` int,
  `note` varchar(255)
);

CREATE TABLE `device_templates` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `test_sheet` int,
  `manuf` varchar(50) NOT NULL,
  `model` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `active` boolean NOT NULL,
  `specs_text` text,
  `specs_file` blob
);

CREATE TABLE `companies` (
  `id` varchar(20) UNIQUE PRIMARY KEY NOT NULL,
  `name` varchar(50) NOT NULL,
  `note` text
);

CREATE TABLE `addresses` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `address_type` ENUM('ship_to','bill_to','remit_to','recalls','certificates'),
  `address_name` varchar(100),
  `active` boolean NOT NULL,
  `street1` varchar(50) NOT NULL,
  `street2` varchar(50),
  `street3` varchar(50),
  `city` varchar(50),
  `state` varchar(50),
  `zip` varchar(20),
  `country` varchar(50),
  `address_company` varchar(20),
  `note` text
);

CREATE TABLE `contacts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `active` boolean NOT NULL,
  `title` varchar(50) NOT NULL,
  `name` varchar(100),
  `phone` varchar(50),
  `phone2` varchar(50),
  `email` varchar(100),
  `company` varchar(20) NOT NULL,
  `note` text
);

CREATE TABLE `devices` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_num` varchar(30) NOT NULL,
  `device_owner` int NOT NULL,
  `serial` varchar(50) NOT NULL,
  `active` boolean NOT NULL,
  `cycle_num` int NOT NULL,
  `cycle_unit` ENUM('days','weeks','months','years') NOT NULL,
  `department` varchar(50),
  `note` text,
  `device_template` int NOT NULL
);

CREATE TABLE `training` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `topic` varchar(100) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `employees` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `contact` int NOT NULL,
  `active` boolean NOT NULL,
  `start_date` datetime NOT NULL
);

CREATE TABLE `employee_training` (
  `employee` int NOT NULL,
  `training` int NOT NULL,
  `signoff_date` datetime NOT NULL,
  `trainer` int NOT NULL,
  `active` boolean NOT NULL,
  `note` text
);

CREATE TABLE `workorders` (
  `id` int PRIMARY KEY NOT NULL,
  `received_date` datetime NOT NULL,
  `receiver` int,
  `address` int,
  `contact` int,
  `note` text
);

CREATE TABLE `tickets` (
  `id` int PRIMARY KEY NOT NULL,
  `device` int,
  `workorder` int,
  `turn_time` int NOT NULL,
  `condition` varchar(255) NOT NULL,
  `status` ENUM('received','WIP','hold','QA','returned') NOT NULL,
  `status_note` varchar(255),
  `note` text
);

CREATE TABLE `employees_tickets` (
  `ticket` int,
  `employee` int
);

CREATE TABLE `certificates` (
  `ticket` int PRIMARY KEY,
  `cert_date` datetime NOT NULL,
  `found` ENUM('IT','OOT','Damaged','PrevLimit') NOT NULL,
  `left` ENUM('LAF','ITadj','OOTadj','ITrep','OOTrep','Limit') NOT NULL,
  `remarks` text,
  `temp_num` decimal NOT NULL,
  `temp_unit` ENUM('C','F','K','R') NOT NULL,
  `humidity` decimal NOT NULL,
  `pressure_num` decimal,
  `pressure_unit` varchar(10),
  `due_date` date,
  `technician` int NOT NULL,
  `tech_date` datetime NOT NULL,
  `qa_sign` int,
  `qa_date` datetime
);

CREATE TABLE `cert_standards` (
  `standard` int,
  `cert` int
);

CREATE TABLE `test_records` (
  `ticket` int NOT NULL,
  `test_item` int NOT NULL,
  `found` varchar(20),
  `found_pass` boolean,
  `left` varchar(20),
  `left_pass` boolean,
  `uncert` decimal
);

CREATE TABLE `packing_slips` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `carrier` varchar(50),
  `tracking` varchar(255),
  `ship_date` datetime NOT NULL,
  `employee` int
);

CREATE TABLE `packing_tickets` (
  `ticket` int NOT NULL,
  `packing_slip` int NOT NULL
);

CREATE TABLE `audit` (
  `id` int UNIQUE NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `change_date` datetime NOT NULL,
  `entity` varchar(255) NOT NULL,
  `object_id` varchar(255) NOT NULL,
  `fieldname` varchar(255) NOT NULL,
  `oldvalue` varchar(255),
  `newvalue` varchar(255),
  `operation` ENUM('add','update','delete')
);

ALTER TABLE `test_sheets` ADD FOREIGN KEY (`method`) REFERENCES `methods` (`id`);

ALTER TABLE `test_items` ADD FOREIGN KEY (`test_sheet`) REFERENCES `test_sheets` (`id`);

ALTER TABLE `device_templates` ADD FOREIGN KEY (`test_sheet`) REFERENCES `test_sheets` (`id`);

ALTER TABLE `addresses` ADD FOREIGN KEY (`address_company`) REFERENCES `companies` (`id`);

ALTER TABLE `contacts` ADD FOREIGN KEY (`company`) REFERENCES `companies` (`id`);

ALTER TABLE `devices` ADD FOREIGN KEY (`device_template`) REFERENCES `device_templates` (`id`);

ALTER TABLE `devices` ADD FOREIGN KEY (`device_owner`) REFERENCES `contacts` (`id`);

ALTER TABLE `employees` ADD FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`);

ALTER TABLE `employee_training` ADD FOREIGN KEY (`employee`) REFERENCES `employees` (`id`);

ALTER TABLE `employee_training` ADD FOREIGN KEY (`training`) REFERENCES `training` (`id`);

ALTER TABLE `employee_training` ADD FOREIGN KEY (`trainer`) REFERENCES `employees` (`id`);

ALTER TABLE `workorders` ADD FOREIGN KEY (`receiver`) REFERENCES `employees` (`id`);

ALTER TABLE `workorders` ADD FOREIGN KEY (`address`) REFERENCES `addresses` (`id`);

ALTER TABLE `workorders` ADD FOREIGN KEY (`contact`) REFERENCES `contacts` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`device`) REFERENCES `devices` (`id`);

ALTER TABLE `tickets` ADD FOREIGN KEY (`workorder`) REFERENCES `workorders` (`id`);

ALTER TABLE `employees_tickets` ADD FOREIGN KEY (`ticket`) REFERENCES `tickets` (`id`);

ALTER TABLE `employees_tickets` ADD FOREIGN KEY (`employee`) REFERENCES `employees` (`id`);

ALTER TABLE `certificates` ADD FOREIGN KEY (`ticket`) REFERENCES `tickets` (`id`);

ALTER TABLE `certificates` ADD FOREIGN KEY (`technician`) REFERENCES `employees` (`id`);

ALTER TABLE `certificates` ADD FOREIGN KEY (`qa_sign`) REFERENCES `employees` (`id`);

ALTER TABLE `cert_standards` ADD FOREIGN KEY (`standard`) REFERENCES `devices` (`id`);

ALTER TABLE `cert_standards` ADD FOREIGN KEY (`cert`) REFERENCES `certificates` (`ticket`);

ALTER TABLE `test_records` ADD FOREIGN KEY (`ticket`) REFERENCES `tickets` (`id`);

ALTER TABLE `test_records` ADD FOREIGN KEY (`test_item`) REFERENCES `test_items` (`id`);

ALTER TABLE `packing_slips` ADD FOREIGN KEY (`employee`) REFERENCES `employees` (`id`);

ALTER TABLE `packing_tickets` ADD FOREIGN KEY (`ticket`) REFERENCES `tickets` (`id`);

ALTER TABLE `packing_tickets` ADD FOREIGN KEY (`packing_slip`) REFERENCES `packing_slips` (`id`);
