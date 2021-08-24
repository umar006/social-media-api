CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `biodata` text
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `post` text NOT NULL,
  `attachment` varchar(255),
  `created_at` timestamp,
  `username` varchar(255)
);

CREATE TABLE `hashtags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `hashtag` varchar(255) NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `post_hashtags` (
  `post_id` int NOT NULL,
  `hashtag_id` int NOT NULL
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comment` text NOT NULL,
  `attachment` varchar(255),
  `created_at` timestamp,
  `post_id` int,
  `username` varchar(255)
);

ALTER TABLE `posts` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);

ALTER TABLE `post_hashtags` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `post_hashtags` ADD FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
