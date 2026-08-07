import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, varchar, double, timestamp, unique, text, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const comments = mysqlTable("comments", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	post_id: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	content: varchar("content", { length: 1500 }).notNull(),
	like_count: int("like_count").default(0).notNull(),
	score: double("score"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		user_id: index("user_id").on(table.user_id),
		post_id: index("post_id").on(table.post_id),
		comments_id: primaryKey({ columns: [table.id], name: "comments_id"}),
	}
});

export const follows = mysqlTable("follows", {
	follower_id: int("follower_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	following_id: int("following_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		following_id: index("following_id").on(table.following_id),
		follows_follower_id_following_id: primaryKey({ columns: [table.follower_id, table.following_id], name: "follows_follower_id_following_id"}),
	}
});

export const likes = mysqlTable("likes", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	post_id: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" } ),
	comment_id: int("comment_id").references(() => comments.id, { onDelete: "cascade" } ),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		post_id: index("post_id").on(table.post_id),
		comment_id: index("comment_id").on(table.comment_id),
		likes_id: primaryKey({ columns: [table.id], name: "likes_id"}),
		unique_like: unique("unique_like").on(table.user_id, table.post_id, table.comment_id),
	}
});

export const posts = mysqlTable("posts", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	title: varchar("title", { length: 200 }).notNull(),
	content: text("content"),
	status: mysqlEnum("status", ['draft','published']).default('draft').notNull(),
	image_path: varchar("image_path", { length: 200 }),
	like_count: int("like_count").default(0).notNull(),
	score: double("score"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow(),
},
(table) => {
	return {
		user_id: index("user_id").on(table.user_id),
		idx_feed_posts: index("idx_feed_posts").on(table.status, table.created_at),
		posts_id: primaryKey({ columns: [table.id], name: "posts_id"}),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 100 }).notNull(),
	name: varchar("name", { length: 100 }),
	email: varchar("email", { length: 100 }).notNull(),
	bio: varchar("bio", { length: 500 }),
	avatar: varchar("avatar", { length: 500 }),
	password_hash: varchar("password_hash", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
		username: unique("username").on(table.username),
		email: unique("email").on(table.email),
	}
});