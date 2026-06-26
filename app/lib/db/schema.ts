import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, varchar, double, timestamp, unique, text, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const comments = mysqlTable("comments", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	postId: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	content: varchar({ length: 1500 }).notNull(),
	likeCount: int("like_count").default(0).notNull(),
	score: double(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("user_id").on(table.userId),
	index("post_id").on(table.postId),
	primaryKey({ columns: [table.id], name: "comments_id"}),
]);

export const follows = mysqlTable("follows", {
	followerId: int("follower_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	followingId: int("following_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("following_id").on(table.followingId),
	primaryKey({ columns: [table.followerId, table.followingId], name: "follows_follower_id_following_id"}),
]);

export const likes = mysqlTable("likes", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	postId: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	commentId: int("comment_id").references(() => comments.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	index("post_id").on(table.postId),
	index("comment_id").on(table.commentId),
	primaryKey({ columns: [table.id], name: "likes_id"}),
	unique("unique_like").on(table.userId, table.postId, table.commentId),
]);

export const posts = mysqlTable("posts", {
	id: int().autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	title: varchar({ length: 200 }).notNull(),
	content: text(),
	status: mysqlEnum(['draft','published']).default('draft').notNull(),
	imagePath: varchar("image_path", { length: 200 }),
	likeCount: int("like_count").default(0).notNull(),
	score: double(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => [
	index("user_id").on(table.userId),
	primaryKey({ columns: [table.id], name: "posts_id"}),
]);

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	username: varchar({ length: 100 }).notNull(),
	name: varchar({ length: 100 }),
	email: varchar({ length: 100 }).notNull(),
	bio: varchar({ length: 500 }),
	avatar: varchar({ length: 500 }),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("username").on(table.username),
	unique("email").on(table.email),
]);
