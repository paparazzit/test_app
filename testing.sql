-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2021 at 06:26 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(255) NOT NULL,
  `testId` int(255) NOT NULL,
  `authorId` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer_a` varchar(255) NOT NULL,
  `answer_b` varchar(255) NOT NULL,
  `points` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `testId`, `authorId`, `question`, `answer_a`, `answer_b`, `points`) VALUES
(33, 137, 41, 'koje bio Vuk K.', 'Reformator', 'reformator srpskoj jezika', 10),
(34, 137, 41, 'koliko glasova ima Sr. jezik', '30', 'trideset', 9),
(35, 137, 41, 'koliko ima vokala', '6', 'sest', 25),
(36, 138, 41, 'ko je bio njutn', 'naucnik', 'stari naucnik', 12),
(37, 138, 41, 'ko je otkrio radiaciju', 'Porodica Kiri', 'Porodica kiri ', 55),
(38, 139, 40, 'koliko zubaca ima testera', '33', '133', 5),
(39, 139, 40, 'kako se zove alat za zakucavanje eksera', 'cekic', 'cekicko', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(255) NOT NULL,
  `authorId` int(255) NOT NULL,
  `authorName` varchar(255) NOT NULL,
  `testName` varchar(255) NOT NULL,
  `testSbj` varchar(255) NOT NULL,
  `totalPoints` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `authorId`, `authorName`, `testName`, `testSbj`, `totalPoints`) VALUES
(137, 41, 'superAdmin', 'Srpski Jezik', 'Istorija jezika', 44),
(138, 41, 'superAdmin', 'fizika', 'uvod u fiziku', 67),
(139, 40, 'bosiljko', 'tehnicko', 'tehnicko vaspitanje', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `edited_at`, `role`) VALUES
(36, 'paja Mogin', 'pajaMogin@gmail.com', '$2y$10$cbnJUzjglfmH83gTO.SNDe9J.8nbr95p0sfPOnZYRNbhlDM2tWY.u', '2021-10-07 10:13:01', NULL, 'admin'),
(40, 'bosiljko', 'bosiljko@gmail.com', '$2y$10$WxhbBFZG.X4r0MGvaJOS7eA8FdMdrEh5ZjhIg1liKvJczBkWW7dp2', '2021-10-07 16:28:18', NULL, 'moderator'),
(41, 'superAdmin', 'superAdmin@email.com', '$2y$10$cZX9UTsJ6V3AsH2BUo6P6.lAXdgYyEI6Ess1NDsYGDqnPVfaK1XWC', '2021-10-08 17:35:22', '2021-10-24 15:47:11', 'admin'),
(46, 'Visnja Sijacic', 'visnja@gmail.com', '$2y$10$s/fxEq4y6ZfpbQbRxf35deQC5XKoWHGP3wHJhZOwteuo4BEQB6Xa.', '2021-10-16 21:17:59', NULL, 'moderator'),
(47, 'Zdravko', 'zdravko@gmail.com', '$2y$10$JicifTHF2gez3zzsikrwe.Gma./fp7nl7jX/YDpJB.RluVvEd4rLG', '2021-10-16 21:20:17', NULL, 'guest'),
(48, 'sloba', 'sloba@gmail.com', '$2y$10$vljZB9ihvv8QU.RG8gr3HO8peqBxF4gY7rWf2wJgpeWSLM3TkuJT6', '2021-10-17 06:12:47', '2021-10-17 10:02:10', 'guest'),
(49, 'danilo', 'danilo@gmail.com', '$2y$10$lwc3t3pg9Lurakz1ilV6i.2asklXOX5mV4oTRr7DGVBX/QSeqazpS', '2021-10-17 06:13:19', '2021-10-17 06:17:20', 'moderator'),
(50, 'admin2', 'admin@gmail.com', '$2y$10$lr54biMvCIh.Y/KHaikQFO/89q54Bp9Iy9cbQ7rYQHe.JrCRFhAGW', '2021-10-17 10:09:52', '2021-10-17 10:12:12', 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
