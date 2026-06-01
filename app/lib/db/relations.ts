import { relations } from "drizzle-orm/relations";
import { users, comments, posts } from "./schema";

export const commentsRelations = relations(comments, ({one}) => ({
	user: one(users, {
		fields: [comments.user_id],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [comments.post_id],
		references: [posts.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comments),
	posts: many(posts),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	comments: many(comments),
	user: one(users, {
		fields: [posts.user_id],
		references: [users.id]
	}),
}));