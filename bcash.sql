-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 09 2020 г., 13:48
-- Версия сервера: 5.5.62
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bcash`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `msg` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `vkgroup` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `vkid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `vktoken` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `minbet` float NOT NULL,
  `maxbet` float NOT NULL,
  `minvivod` float NOT NULL,
  `changecolorsum` float NOT NULL,
  `changenicksum` float NOT NULL,
  `chatunbansum` float NOT NULL,
  `refsum` float NOT NULL,
  `recaptchasitekey` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recaptchasecretkey` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `standartbonus` float NOT NULL,
  `merchant_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `merchant_secret_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `merchant_secret_2` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `config`
--

INSERT INTO `config` (`id`, `name`, `domain`, `vkgroup`, `vkid`, `vktoken`, `minbet`, `maxbet`, `minvivod`, `changecolorsum`, `changenicksum`, `chatunbansum`, `refsum`, `recaptchasitekey`, `recaptchasecretkey`, `standartbonus`, `merchant_id`, `merchant_secret_1`, `merchant_secret_2`) VALUES
(1, 'ScriptArchive', 'fun', 'https://vk.com/script.archive', '191281518', '2c234b73af6ef5fdeaef7e8973962d4bf5eb75319b643c1efe5033eb1a9e782d1a73c2f85fab958c661f5', 1, 100, 33, 30, 30, 30, 3, '6Lfzo98UAAAAABzH4LB5zYA9ghEtQZMRkv0jnpbK', '6Lfzo98UAAAAANwcgule53qh7NEAeU2-YjU_WxQF', 1, '1111', 'dsadas', 'asdasd');

-- --------------------------------------------------------

--
-- Структура таблицы `deposits`
--

CREATE TABLE `deposits` (
  `id` int(11) NOT NULL,
  `pay_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `size` float NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bet` float NOT NULL,
  `chance` float NOT NULL,
  `number` float NOT NULL,
  `color` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dropcolor` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `prefix`
--

CREATE TABLE `prefix` (
  `id` int(11) NOT NULL,
  `deposit` float NOT NULL,
  `prefix` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `bonussize` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `promo`
--

CREATE TABLE `promo` (
  `id` int(11) NOT NULL,
  `code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` float NOT NULL,
  `actived` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `actives` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `users` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `namecolor` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prava` int(11) NOT NULL,
  `balance` float NOT NULL,
  `sid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `vk_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ref_code` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `referer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `warns` int(11) NOT NULL,
  `ban` int(11) NOT NULL,
  `online` int(11) NOT NULL,
  `bonustaked` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `regdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `withdraws`
--

CREATE TABLE `withdraws` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `system` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `wallet` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `status` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `prefix`
--
ALTER TABLE `prefix`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `withdraws`
--
ALTER TABLE `withdraws`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `deposits`
--
ALTER TABLE `deposits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `prefix`
--
ALTER TABLE `prefix`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `promo`
--
ALTER TABLE `promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `withdraws`
--
ALTER TABLE `withdraws`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
