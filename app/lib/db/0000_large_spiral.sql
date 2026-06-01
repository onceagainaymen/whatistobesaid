-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`post_id` int NOT NULL,
	`content` varchar(1500),
	`score` double,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(100),
	`content` varchar(1500),
	`score` double,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100),
	`name` varchar(100),
	`email` varchar(100),
	`bio` varchar(500),
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`),
	CONSTRAINT `username` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `post_id` ON `comments` (`post_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `comments` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `posts` (`user_id`);
*/