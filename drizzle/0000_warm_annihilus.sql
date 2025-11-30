CREATE TABLE `equipment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `equipment_name_unique` ON `equipment` (`name`);--> statement-breakpoint
CREATE TABLE `exercise_equipment` (
	`exercise_id` integer NOT NULL,
	`equipment_id` integer NOT NULL,
	PRIMARY KEY(`exercise_id`, `equipment_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`equipment_id`) REFERENCES `equipment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercise_muscles` (
	`exercise_id` integer NOT NULL,
	`muscle_id` integer NOT NULL,
	`role` text DEFAULT 'primary' NOT NULL,
	PRIMARY KEY(`exercise_id`, `muscle_id`),
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`muscle_id`) REFERENCES `muscles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `muscle_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `muscle_groups_name_unique` ON `muscle_groups` (`name`);--> statement-breakpoint
CREATE TABLE `muscles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`common_name` text NOT NULL,
	`muscle_group_id` integer NOT NULL,
	FOREIGN KEY (`muscle_group_id`) REFERENCES `muscle_groups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `muscles_name_unique` ON `muscles` (`name`);--> statement-breakpoint
CREATE TABLE `user_exercise_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_exercise_id` integer NOT NULL,
	`url` text NOT NULL,
	FOREIGN KEY (`user_exercise_id`) REFERENCES `user_exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_sets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_exercise_id` integer NOT NULL,
	`reps` integer,
	`weight` integer,
	`is_warmup` integer DEFAULT false,
	`timestamp` integer,
	FOREIGN KEY (`user_exercise_id`) REFERENCES `user_exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
