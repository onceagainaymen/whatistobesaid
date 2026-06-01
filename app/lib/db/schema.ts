import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, int, varchar, double, timestamp, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const comments = mysqlTable("comments", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	post_id: int("post_id").notNull().references(() => posts.id),
	content: varchar("content", { length: 1500 }),
	score: double("score"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		post_id: index("post_id").on(table.post_id),
		user_id: index("user_id").on(table.user_id),
		comments_id: primaryKey({ columns: [table.id], name: "comments_id"}),
	}
});

export const posts = mysqlTable("posts", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	title: varchar("title", { length: 100 }),
	content: varchar("content", { length: 1500 }),
	score: double("score"),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		user_id: index("user_id").on(table.user_id),
		posts_id: primaryKey({ columns: [table.id], name: "posts_id"}),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 100 }),
	name: varchar("name", { length: 100 }),
	email: varchar("email", { length: 100 }),
	bio: varchar("bio", { length: 500 }),
	password_hash: varchar("password_hash", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
		email: unique("email").on(table.email),
		username: unique("username").on(table.username),
	}
});