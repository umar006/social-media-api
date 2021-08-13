CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(68) UNIQUE NOT NULL,
  `email` varchar(68) UNIQUE NOT NULL,
  `biodata` text
);

CREATE TABLE `posts` (
  `post_id` int PRIMARY KEY AUTO_INCREMENT,
  `post` text NOT NULL,
  `user_id` int NOT NULL,
  `attachment_id` int
);

CREATE TABLE `hashtags` (
  `hashtag_id` int PRIMARY KEY AUTO_INCREMENT,
  `hashtag` varchar(32) NOT NULL,
  `created_at` varchar(8)
);

CREATE TABLE `post_hashtag` (
  `post_id` int,
  `hashtag_id` int
);

CREATE TABLE `comments` (
  `comment_id` int PRIMARY KEY AUTO_INCREMENT,
  `comment` text NOT NULL,
  `user_id` int,
  `attachment_id` int
);

CREATE TABLE `post_comment` (
  `post_id` int,
  `comment_id` int
);

CREATE TABLE `attachments` (
  `attachment_id` int PRIMARY KEY AUTO_INCREMENT,
  `attachment` blob
);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `post_hashtag` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

ALTER TABLE `post_hashtag` ADD FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags` (`hashtag_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `post_comment` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`);

ALTER TABLE `post_comment` ADD FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`);

ALTER TABLE `attachments` ADD FOREIGN KEY (`attachment_id`) REFERENCES `comments` (`attachment_id`);

ALTER TABLE `attachments` ADD FOREIGN KEY (`attachment_id`) REFERENCES `posts` (`attachment_id`);
