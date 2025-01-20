-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 25-01-20 09:40
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `myshop`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin', '$2b$10$.TEW2jlkMtvnudKQk/ICwej5/OPhTVhLAsVft4Xt2ztHSbPqiPNVG', '2025-01-06 05:56:23', '2025-01-07 05:23:23', 'admin');

-- --------------------------------------------------------

--
-- 테이블 구조 `board`
--

CREATE TABLE `board` (
  `BOARD_ID` int(11) NOT NULL,
  `BOARD_TITLE` varchar(33) NOT NULL,
  `BOARD_CONTENT` varchar(555) NOT NULL,
  `REGISTER_ID` varchar(22) NOT NULL,
  `REGISTER_DATE` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `board`
--

INSERT INTO `board` (`BOARD_ID`, `BOARD_TITLE`, `BOARD_CONTENT`, `REGISTER_ID`, `REGISTER_DATE`) VALUES
(1, '제목1', '내용1', 'admin', '2025-01-05 04:21:13'),
(2, '제목2', '내용2', 'admin', '2025-01-05 04:21:13'),
(3, '제목3', '내용3', 'admin', '2025-01-05 04:21:13'),
(4, '12312', '123', 'admin', '2025-01-05 22:30:01'),
(5, '123123', '123123', 'admin', '2025-01-06 00:01:42'),
(6, '223', '555', 'admin', '2025-01-06 00:01:51'),
(7, 'test', 'test', 'admin', '2025-01-16 05:11:52'),
(8, 'test', 'test', 'admin', '2025-01-16 05:12:00'),
(9, '132', '123', 'admin', '2025-01-16 11:50:26'),
(10, '11', '11', 'admin', '2025-01-16 11:50:39');

-- --------------------------------------------------------

--
-- 테이블 구조 `category`
--

CREATE TABLE `category` (
  `cid` int(11) NOT NULL,
  `code` varchar(15) NOT NULL,
  `pcode` varchar(15) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `step` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `category`
--

INSERT INTO `category` (`cid`, `code`, `pcode`, `name`, `step`) VALUES
(1, 'A0001', NULL, '컴퓨터', 1),
(2, 'B0001', 'A0001', '노트북', 2),
(3, 'C0001', 'B0001', '게임용', 3),
(4, 'A0002', NULL, '핸드폰', 1),
(9, '001', NULL, '의류', 1),
(10, '002', NULL, '신발', 1),
(11, '003', NULL, '액세서리', 1),
(12, '00101', '001', '상의', 2),
(13, '00102', '001', '하의', 2),
(14, '00103', '001', '아우터', 2),
(15, '00201', '002', '운동화', 2),
(16, '00202', '002', '구두', 2),
(17, '00301', '003', '모자', 2),
(18, '0010101', '00101', '티셔츠', 3),
(19, '0010102', '00101', '셔츠', 3),
(20, '0010103', '00101', '블라우스', 3),
(21, '0010201', '00102', '청바지', 3),
(22, '0010202', '00102', '슬랙스', 3),
(23, '0010301', '00103', '코트', 3),
(24, '0010302', '00103', '패딩', 3),
(25, '0020101', '00201', '런닝화', 3),
(26, '0020102', '00201', '등산화', 3),
(27, '0030101', '00301', '야구모자', 3),
(28, '0030102', '00301', '버킷햇', 3),
(34, '01111', NULL, '기타', 1),
(35, '01129', '01111', '소품', 2),
(36, '01119', '01129', '마이크', 3),
(37, '10101', '01129', '헤드폰', 3),
(38, '19102', '01111', '장식품', 2),
(39, '01190', '19102', '걸상', 3),
(40, '11919', '19102', '받침대', 3);

-- --------------------------------------------------------

--
-- 테이블 구조 `category_options`
--

CREATE TABLE `category_options` (
  `category_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  `is_main` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `requested`
--

CREATE TABLE `requested` (
  `rowno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `requested`
--

INSERT INTO `requested` (`rowno`) VALUES
(1),
(1),
(1),
(1),
(1),
(1);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 테이블의 인덱스 `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`BOARD_ID`);

--
-- 테이블의 인덱스 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`);

--
-- 테이블의 인덱스 `category_options`
--
ALTER TABLE `category_options`
  ADD PRIMARY KEY (`category_id`,`option_id`),
  ADD KEY `option_id` (`option_id`);

--
-- 테이블의 인덱스 `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `board`
--
ALTER TABLE `board`
  MODIFY `BOARD_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- 테이블의 AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `category_options`
--
ALTER TABLE `category_options`
  ADD CONSTRAINT `category_options_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`cid`),
  ADD CONSTRAINT `category_options_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`);

--
-- 테이블의 제약사항 `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
