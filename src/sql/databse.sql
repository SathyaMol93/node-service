CREATE DATABASE `sap` /*!40100 DEFAULT CHARACTER SET latin1 */;


CREATE TABLE `province` (
  `province_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `province_code` varchar(255) DEFAULT NULL,
  `province_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `distric` (
  `distric_id` int(11) NOT NULL,
  `distric_code` varchar(255) DEFAULT NULL,
  `distric_name` varchar(255) DEFAULT NULL,
  `province_id` int(11) NOT NULL,
  PRIMARY KEY (`distric_id`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `distric_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ds_division` (
  `ds_division_id` int(11) NOT NULL,
  `distric_id` int(11) DEFAULT NULL,
  `division_code` varchar(255) DEFAULT NULL,
  `division_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ds_division_id`),
  KEY `distric_id` (`distric_id`),
  CONSTRAINT `ds_division_ibfk_1` FOREIGN KEY (`distric_id`) REFERENCES `distric` (`distric_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `gn_division` (
  `gn_division_id` int(11) NOT NULL,
  `ds_division_id` int(11) DEFAULT NULL,
  `division_code` varchar(255) DEFAULT NULL,
  `gn_division_name` varchar(255) DEFAULT NULL,
  `division_no` varchar(255) DEFAULT NULL,
  `gn_division_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`gn_division_id`),
  KEY `ds_division_id` (`ds_division_id`),
  CONSTRAINT `gn_division_ibfk_1` FOREIGN KEY (`ds_division_id`) REFERENCES `ds_division` (`ds_division_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `role_description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `ukiubw515ff0ugtm28p8g3myt0h` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `nic` varchar(255) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `job_inquiries` (
  `job_inquiries_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ds_division_id` int(11) NOT NULL,
  `gn_division_id` int(11) NOT NULL,
  `inquiry` blob NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `inquiry_type` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `highest_education` varchar(1000) NOT NULL,
  `job` varchar(1000) NOT NULL,
  `job_experience` varchar(1000) NOT NULL,
  `home_town` varchar(1000) NOT NULL,
  PRIMARY KEY (`job_inquiries_id`),
  KEY `user_id` (`user_id`),
  KEY `ds_division_id` (`ds_division_id`),
  KEY `gn_division_id` (`gn_division_id`),
  CONSTRAINT `job_inquiries_ibfk_1` FOREIGN KEY (`gn_division_id`) REFERENCES `gn_division` (`gn_division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_inquiries_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `job_inquiries_ibfk_3` FOREIGN KEY (`ds_division_id`) REFERENCES `ds_division` (`ds_division_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `personal_inquiries` (
  `personal_inquiries_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ds_division_id` int(11) NOT NULL,
  `gn_division_id` int(11) NOT NULL,
  `inquiry` blob NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `inquiry_type` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `contact_no` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`personal_inquiries_id`),
  KEY `user_id` (`user_id`),
  KEY `ds_division_id` (`ds_division_id`),
  KEY `gn_division_id` (`gn_division_id`),
  CONSTRAINT `personal_inquiries_ibfk_1` FOREIGN KEY (`gn_division_id`) REFERENCES `gn_division` (`gn_division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personal_inquiries_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personal_inquiries_ibfk_3` FOREIGN KEY (`ds_division_id`) REFERENCES `ds_division` (`ds_division_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `public_inquiries` (
  `public_inquiries_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ds_division_id` int(11) NOT NULL,
  `gn_division_id` int(11) NOT NULL,
  `inquiry` blob NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`public_inquiries_id`),
  KEY `user_id` (`user_id`),
  KEY `ds_division_id` (`ds_division_id`),
  KEY `gn_division_id` (`gn_division_id`),
  CONSTRAINT `public_inquiries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `public_inquiries_ibfk_2` FOREIGN KEY (`gn_division_id`) REFERENCES `gn_division` (`gn_division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `public_inquiries_ibfk_3` FOREIGN KEY (`ds_division_id`) REFERENCES `ds_division` (`ds_division_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

