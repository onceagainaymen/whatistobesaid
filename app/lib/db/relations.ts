import { relations } from "drizzle-orm/relations";
import { users, comments, posts, follows, likes } from "./schema";

export const commentsRelations = relations(comments, ({one, many}) => ({
	user: one(users, {
		fields: [comments.user_id],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [comments.post_id],
		references: [posts.id]
	}),
	likes: many(likes),
}));

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comments),
	follows_follower_id: many(follows, {
		relationName: "follows_follower_id_users_id"
	}),
	follows_following_id: many(follows, {
		relationName: "follows_following_id_users_id"
	}),
	likes: many(likes),
	posts: many(posts),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	comments: many(comments),
	likes: many(likes),
	user: one(users, {
		fields: [posts.user_id],
		references: [users.id]
	}),
}));

export const followsRelations = relations(follows, ({one}) => ({
	user_follower_id: one(users, {
		fields: [follows.follower_id],
		references: [users.id],
		relationName: "follows_follower_id_users_id"
	}),
	user_following_id: one(users, {
		fields: [follows.following_id],
		references: [users.id],
		relationName: "follows_following_id_users_id"
	}),
}));

export const likesRelations = relations(likes, ({one}) => ({
	user: one(users, {
		fields: [likes.user_id],
		references: [users.id]
	}),
	post: one(posts, {
		fields: [likes.post_id],
		references: [posts.id]
	}),
	comment: one(comments, {
		fields: [likes.comment_id],
		references: [comments.id]
	}),
}));