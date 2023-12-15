-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 14 2023 г., 22:13
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `artmart`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auctions`
--

CREATE TABLE `auctions` (
  `auction_id` int NOT NULL,
  `painting_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_price` decimal(12,2) NOT NULL,
  `buyout_price` decimal(12,2) DEFAULT NULL,
  `bet_id` int DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `auctions`
--

INSERT INTO `auctions` (`auction_id`, `painting_id`, `user_id`, `start_date`, `end_date`, `start_price`, `buyout_price`, `bet_id`, `is_current`) VALUES
(5, 12, 39, '2023-10-27', '2023-10-30', '20.50', '50.70', 8, 0),
(6, 3, 39, '2023-10-29', '2023-10-31', '221.00', '505.00', 13, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `bets`
--

CREATE TABLE `bets` (
  `bet_id` int NOT NULL,
  `auction_id` int NOT NULL,
  `user_id` int NOT NULL,
  `bet` decimal(10,2) NOT NULL,
  `bet_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `bets`
--

INSERT INTO `bets` (`bet_id`, `auction_id`, `user_id`, `bet`, `bet_time`) VALUES
(4, 6, 40, '5.00', '2023-10-27 17:35:02'),
(5, 6, 40, '17.00', '2023-10-27 17:37:04'),
(6, 6, 40, '5054.30', '2023-10-27 18:15:09'),
(7, 5, 40, '50.70', '2023-10-30 23:09:44'),
(8, 5, 40, '50.70', '2023-10-30 23:25:09'),
(9, 6, 39, '777.00', '2023-11-01 19:48:18'),
(10, 6, 39, '777.00', '2023-11-01 19:51:22'),
(11, 6, 40, '777.00', '2023-11-01 19:53:12'),
(12, 6, 39, '777.00', '2023-11-01 19:55:32'),
(13, 6, 39, '777.00', '2023-11-01 19:55:37');

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `comment_id` int NOT NULL,
  `painting_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_datetime` datetime NOT NULL,
  `content` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`comment_id`, `painting_id`, `user_id`, `comment_datetime`, `content`) VALUES
(1, 12, 39, '2023-05-25 23:04:30', 'sdgfsagfs'),
(2, 12, 39, '2023-05-25 23:04:34', 'sdgfsagfs'),
(3, 12, 39, '2023-05-25 23:04:35', 'sdgfsagfs'),
(4, 12, 39, '2023-05-25 23:04:36', 'sdgfsagfs'),
(6, 12, 39, '2023-05-25 23:04:37', 'test'),
(7, 12, 66, '2023-05-28 19:37:53', 'fewf4gh6j6kktekrdkm'),
(8, 12, 67, '2023-05-30 23:56:09', 'ffffffff'),
(10, 2, 39, '2023-11-01 18:46:14', 'normik');

-- --------------------------------------------------------

--
-- Структура таблицы `countries`
--

CREATE TABLE `countries` (
  `country_id` int NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `countries`
--

INSERT INTO `countries` (`country_id`, `name`) VALUES
(1, 'Afghanistan'),
(2, 'Albania'),
(3, 'Algeria'),
(4, 'Andorra'),
(5, 'Angola'),
(6, 'Antigua and Barbuda'),
(7, 'Argentina'),
(8, 'Armenia'),
(9, 'Australia'),
(10, 'Austria'),
(11, 'Azerbaijan'),
(12, 'Bahamas'),
(13, 'Bahrain'),
(14, 'Bangladesh'),
(15, 'Barbados'),
(16, 'Belarus'),
(17, 'Belgium'),
(18, 'Belize'),
(19, 'Benin'),
(20, 'Bhutan'),
(21, 'Bolivia'),
(22, 'Bosnia and Herzegovina'),
(23, 'Botswana'),
(24, 'Brazil'),
(25, 'Brunei'),
(26, 'Bulgaria'),
(27, 'Burkina Faso'),
(28, 'Burundi'),
(29, 'Cabo Verde'),
(30, 'Cambodia'),
(31, 'Cameroon'),
(32, 'Canada'),
(33, 'Central African Republic'),
(34, 'Chad'),
(35, 'Chile'),
(36, 'China'),
(37, 'Colombia'),
(38, 'Comoros'),
(39, 'Democratic Republic of the Congo'),
(40, 'Republic of the Congo'),
(41, 'Costa Rica'),
(42, 'Cote d\'Ivoire'),
(43, 'Croatia'),
(44, 'Cuba'),
(45, 'Cyprus'),
(46, 'Czech Republic'),
(47, 'Denmark'),
(48, 'Djibouti'),
(49, 'Dominica'),
(50, 'Dominican Republic'),
(51, 'Ecuador'),
(52, 'Egypt'),
(53, 'El Salvador'),
(54, 'Equatorial Guinea'),
(55, 'Eritrea'),
(56, 'Estonia'),
(57, 'Eswatini'),
(58, 'Ethiopia'),
(59, 'Fiji'),
(60, 'Finland'),
(61, 'France'),
(62, 'Gabon'),
(63, 'Gambia'),
(64, 'Georgia'),
(65, 'Germany'),
(66, 'Ghana'),
(67, 'Greece'),
(68, 'Grenada'),
(69, 'Guatemala'),
(70, 'Guinea'),
(71, 'Guinea-Bissau'),
(72, 'Guyana'),
(73, 'Haiti'),
(74, 'Honduras'),
(75, 'Hungary'),
(76, 'Iceland'),
(77, 'India'),
(78, 'Indonesia'),
(79, 'Iran'),
(80, 'Iraq'),
(81, 'Ireland'),
(82, 'Israel'),
(83, 'Italy'),
(84, 'Jamaica'),
(85, 'Japan'),
(86, 'Jordan'),
(87, 'Kazakhstan'),
(88, 'Kenya'),
(89, 'Kiribati'),
(90, 'Kosovo'),
(91, 'Kuwait'),
(92, 'Kyrgyzstan'),
(93, 'Laos'),
(94, 'Latvia'),
(95, 'Lebanon'),
(96, 'Lesotho'),
(97, 'Liberia'),
(98, 'Libya'),
(99, 'Liechtenstein'),
(100, 'Lithuania'),
(101, 'Luxembourg'),
(102, 'Madagascar'),
(103, 'Malawi'),
(104, 'Malaysia'),
(105, 'Maldives'),
(106, 'Mali'),
(107, 'Malta'),
(108, 'Marshall Islands'),
(109, 'Mauritania'),
(110, 'Mauritius'),
(111, 'Mexico'),
(112, 'Micronesia'),
(113, 'Moldova'),
(114, 'Monaco'),
(115, 'Mongolia'),
(116, 'Montenegro'),
(117, 'Morocco'),
(118, 'Mozambique'),
(119, 'Myanmar'),
(120, 'Namibia'),
(121, 'Nauru'),
(122, 'Nepal'),
(123, 'Netherlands'),
(124, 'New Zealand'),
(125, 'Nicaragua'),
(126, 'Niger'),
(127, 'Nigeria'),
(128, 'North Korea'),
(129, 'North Macedonia'),
(130, 'Norway'),
(131, 'Oman'),
(132, 'Pakistan'),
(133, 'Palau'),
(134, 'Palestine'),
(135, 'Panama'),
(136, 'Papua New Guinea'),
(137, 'Paraguay'),
(138, 'Peru'),
(139, 'Philippines'),
(140, 'Poland'),
(141, 'Portugal'),
(142, 'Qatar'),
(143, 'Romania'),
(144, 'Russia'),
(145, 'Rwanda'),
(146, 'Saint Kitts and Nevis'),
(147, 'Saint Lucia'),
(148, 'Saint Vincent and the Grenadines'),
(149, 'Samoa'),
(150, 'San Marino'),
(151, 'Sao Tome and Principe'),
(152, 'Saudi Arabia'),
(153, 'Senegal'),
(154, 'Serbia'),
(155, 'Seychelles'),
(156, 'Sierra Leone'),
(157, 'Singapore'),
(158, 'Slovakia'),
(159, 'Slovenia'),
(160, 'Solomon Islands'),
(161, 'Somalia'),
(162, 'South Africa'),
(163, 'South Korea'),
(164, 'South Sudan'),
(165, 'Spain'),
(166, 'Sri Lanka'),
(167, 'Sudan'),
(168, 'Suriname'),
(169, 'Sweden'),
(170, 'Switzerland'),
(171, 'Syria'),
(172, 'Taiwan'),
(173, 'Tajikistan'),
(174, 'Tanzania'),
(175, 'Thailand'),
(176, 'Timor-Leste'),
(177, 'Togo'),
(178, 'Tonga'),
(179, 'Trinidad and Tobago'),
(180, 'Tunisia'),
(181, 'Turkey'),
(182, 'Turkmenistan'),
(183, 'Tuvalu'),
(184, 'Uganda'),
(185, 'Ukraine'),
(186, 'United Arab Emirates'),
(187, 'United Kingdom'),
(188, 'United States of America'),
(189, 'Uruguay'),
(190, 'Uzbekistan'),
(191, 'Vanuatu'),
(192, 'Vatican City'),
(193, 'Venezuela'),
(194, 'Vietnam'),
(195, 'Yemen'),
(196, 'Zambia'),
(197, 'Zimbabwe'),
(198, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `likes`
--

CREATE TABLE `likes` (
  `painting_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `likes`
--

INSERT INTO `likes` (`painting_id`, `user_id`) VALUES
(2, 39);

-- --------------------------------------------------------

--
-- Структура таблицы `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `icon` varchar(64) NOT NULL,
  `is_viewed` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `message`, `icon`, `is_viewed`) VALUES
(31, 39, 't bought your painting', 'images/users/39/39-8a51604daeeafc2a.jpg', 0),
(32, 39, 't bought your painting', 'images/users/39/paintings/r_1.jpg', 1),
(34, 40, 'You won the auction', 'images/users/39/39-8a51604daeeafc2a.jpg', 0),
(35, 40, 'You won the auction', 'images/users/39/paintings/r_1.jpg', 0),
(38, 40, 'r liked yor painting', 'images/users/40/paintings/t_2.jpg', 0),
(54, 40, 'r commented your painting', 'images/users/40/paintings/t_2.jpg', 0),
(55, 40, 'r subscribed to you', 'images/users/39/39-a5d3aa28ff7aa4c6.jpg', 0),
(59, 40, 'you bet was outbit', 'images/users/39/r_1.jpg', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `paintings`
--

CREATE TABLE `paintings` (
  `painting_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `style_id` int NOT NULL,
  `author_id` int NOT NULL,
  `path_to_paint` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `likes` int DEFAULT '0',
  `comments` int DEFAULT '0',
  `about` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `post_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `paintings`
--

INSERT INTO `paintings` (`painting_id`, `name`, `style_id`, `author_id`, `path_to_paint`, `likes`, `comments`, `about`, `post_datetime`) VALUES
(1, 'Paint 1 By TTTTTT', 1, 40, 'images/users/40/t_1.jpg', 0, 0, 'rsdhxdtrjxdj', '2023-03-08 23:48:01'),
(2, 'Paint 2 by TTTTTT', 6, 40, 'images/users/40/t_2.jpg', 1, 2, 'rsn mftkrm', '2023-05-01 23:49:16'),
(3, 'Paint 1 by RRRRRR', 3, 39, 'images/users/39/r_1.jpg', 0, 0, 'guluigtjgj', '2022-05-15 23:49:37'),
(12, 'wew', 4, 39, 'images/users/39/39-8a51604daeeafc2a.jpg', 0, 7, 'zxzxzxwew', '2023-05-24 19:08:19');

-- --------------------------------------------------------

--
-- Структура таблицы `styles`
--

CREATE TABLE `styles` (
  `style_id` int NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `styles`
--

INSERT INTO `styles` (`style_id`, `name`) VALUES
(1, 'Abstractionism'),
(2, 'Art Deco'),
(3, 'Art Nouveau'),
(4, 'Baroque'),
(5, 'Classicism'),
(6, 'Contemporary'),
(7, 'Cubism'),
(8, 'Expressionism'),
(9, 'Fauvism'),
(10, 'Folk Art'),
(11, 'Graffiti Art'),
(12, 'Hyperrealism'),
(13, 'Impressionism'),
(14, 'Minimalism'),
(15, 'Modern'),
(16, 'Naive Art'),
(17, 'Neo-Classicism'),
(18, 'Neo-Expressionism'),
(19, 'Photorealism'),
(20, 'Pointillism'),
(21, 'Pop Art'),
(22, 'Post-Impressionism'),
(23, 'Realism'),
(24, 'Renaissance'),
(25, 'Rococo'),
(26, 'Romanticism'),
(27, 'Street Art'),
(28, 'Surrealism'),
(29, 'Symbolism'),
(30, 'Other');

-- --------------------------------------------------------

--
-- Структура таблицы `subscribtions`
--

CREATE TABLE `subscribtions` (
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `subscribtions`
--

INSERT INTO `subscribtions` (`follower_id`, `following_id`) VALUES
(40, 39),
(43, 39),
(39, 40),
(39, 41),
(39, 42);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `login` varchar(32) NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `surname` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `email` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profile_picture` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'images/default_profile_picture.jpg',
  `birth_date` date DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `about` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `balance` decimal(12,2) DEFAULT '0.00',
  `create_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `login`, `password`, `surname`, `name`, `email`, `profile_picture`, `birth_date`, `country_id`, `about`, `balance`, `create_date`) VALUES
(39, 'r', '$2y$10$GLp29jTy0TcNR5HACFaHiuuDHH0e0BofhMviLYa3DDV3KOXmFVJWa', 'RRRRRR', 'rrrrrr', 'r@r', 'images/users/39/39-a5d3aa28ff7aa4c6.jpg', '1992-04-17', NULL, 'It\'s me, RRRRRR rrrrrr', '2646520.80', '2023-05-06'),
(40, 't', '$2y$10$CpxZzsujx6G4f8XLGt3nUueHas/NWgVifZIr.AvLSLyzRCxYa7YAe', 'TTTTTT', 'tttttt', 't@t', 'images/default_profile_picture.jpg', '1998-05-02', NULL, 'It\'s me, TTTTTT tttttt', '9932.74', '2023-05-06'),
(41, 'fin', '$2y$10$JrW/CvgTXlTHepygjNESgeg4tin3aqLHzdeIgDocYUpqmlecYWUKm', NULL, NULL, 'e@e', 'images/default_profile_picture.jpg', NULL, NULL, NULL, '0.00', '2023-05-08'),
(42, 'xtfin', '$2y$10$GCIIJqpx9xoo.jmYYnkTKukYZ845tVPiehBI4tLIgxn8b0m6k2N1.', NULL, NULL, 'x@x', 'images/default_profile_picture.jpg', NULL, NULL, NULL, '0.00', '2023-05-09'),
(43, 'finland', '$2y$10$O77ktxng4Jc5DZIqMpIIj.OmR.5iesFCHkybLsuWSWHUSwaBvaTc6', NULL, NULL, 'c@c', 'images/default_profile_picture.jpg', NULL, NULL, NULL, '0.00', '2023-05-09'),
(65, 'finfin', '$2y$10$WE7JfMdHZgCaEtvmh2dJreXQmt5PpHoGI/4lZBdEooSzuYgZGzRE2', NULL, NULL, 'zz@zz', 'images/default_profile_picture.jpg', NULL, NULL, NULL, '0.00', '2023-05-15'),
(66, 'ffin', '$2y$10$qIwMSftTx7KeVRUHLwRxcOO3th0g3DGmvUNFTrwknSwz2m9jinSna', NULL, NULL, 'fg@fg', 'images/default_profile_picture.jpg', NULL, NULL, NULL, '0.00', '2023-05-21'),
(67, 'fin1', '$2y$10$qr7tNpmUUp1mEPsHsP4Kxu1hfSWNv7edY45TX5EXZ6zGljB4Itg.m', NULL, NULL, 'fin1@fin1', 'images/default_profile_picture.jpg', '1948-05-28', 38, 'tytytyty', '0.00', '2023-05-26');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auctions`
--
ALTER TABLE `auctions`
  ADD PRIMARY KEY (`auction_id`),
  ADD KEY `auctions_ibfk_1` (`painting_id`),
  ADD KEY `auctions_ibfk_2` (`bet_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`bet_id`),
  ADD KEY `bets_ibfk_1` (`auction_id`),
  ADD KEY `bets_ibfk_2` (`user_id`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comments_ibfk_1` (`painting_id`),
  ADD KEY `comments_ibfk_2` (`user_id`);

--
-- Индексы таблицы `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Индексы таблицы `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`painting_id`,`user_id`),
  ADD KEY `likes_ibfk_2` (`user_id`);

--
-- Индексы таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `notifications_ibfk_1` (`user_id`);

--
-- Индексы таблицы `paintings`
--
ALTER TABLE `paintings`
  ADD PRIMARY KEY (`painting_id`),
  ADD KEY `paintings_ibfk_1` (`style_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Индексы таблицы `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`style_id`);

--
-- Индексы таблицы `subscribtions`
--
ALTER TABLE `subscribtions`
  ADD UNIQUE KEY `who_sub_id` (`follower_id`,`following_id`),
  ADD UNIQUE KEY `who_sub_id_2` (`follower_id`,`following_id`),
  ADD KEY `on_whom_id` (`following_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `country` (`country_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auctions`
--
ALTER TABLE `auctions`
  MODIFY `auction_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `bets`
--
ALTER TABLE `bets`
  MODIFY `bet_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT для таблицы `paintings`
--
ALTER TABLE `paintings`
  MODIFY `painting_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `styles`
--
ALTER TABLE `styles`
  MODIFY `style_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auctions`
--
ALTER TABLE `auctions`
  ADD CONSTRAINT `auctions_ibfk_1` FOREIGN KEY (`painting_id`) REFERENCES `paintings` (`painting_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `auctions_ibfk_2` FOREIGN KEY (`bet_id`) REFERENCES `bets` (`bet_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `auctions_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `bets`
--
ALTER TABLE `bets`
  ADD CONSTRAINT `bets_ibfk_1` FOREIGN KEY (`auction_id`) REFERENCES `auctions` (`auction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bets_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`painting_id`) REFERENCES `paintings` (`painting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`painting_id`) REFERENCES `paintings` (`painting_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `paintings`
--
ALTER TABLE `paintings`
  ADD CONSTRAINT `paintings_ibfk_1` FOREIGN KEY (`style_id`) REFERENCES `styles` (`style_id`) ON UPDATE RESTRICT,
  ADD CONSTRAINT `paintings_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `subscribtions`
--
ALTER TABLE `subscribtions`
  ADD CONSTRAINT `subscribtions_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscribtions_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE SET NULL ON UPDATE SET NULL;

DELIMITER $$
--
-- События
--
CREATE DEFINER=`root`@`%` EVENT `end_auctions` ON SCHEDULE EVERY 1 DAY STARTS '2023-01-01 00:00:00' ENDS '2043-01-01 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN

INSERT INTO notifications (user_id, message, icon)
SELECT auctions.user_id, CONCAT(users.login, ' bought your painting'), paintings.path_to_paint
FROM auctions
LEFT JOIN bets ON auctions.bet_id = bets.bet_id
JOIN users ON bets.user_id = users.user_id
JOIN paintings ON auctions.painting_id = paintings.painting_id
WHERE is_current = true and end_date <= CURDATE();

INSERT INTO notifications (user_id, message, icon)
SELECT bets.user_id, 'You won the auction', paintings.path_to_paint
FROM auctions
LEFT JOIN bets ON auctions.bet_id = bets.bet_id
JOIN paintings ON auctions.painting_id = paintings.painting_id
WHERE is_current = true and end_date <= CURDATE();

UPDATE auctions
    SET is_current = false
    WHERE is_current = true and end_date <= CURDATE();
    
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
