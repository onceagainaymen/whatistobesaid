// scripts/seed.ts
import { faker } from "@faker-js/faker";
import { db } from "../lib/db";
import { users, posts, comments, likes, follows } from "../lib/db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

// --- CONFIG ---
const NUM_USERS = 20;
const NUM_POSTS = 100;
const NUM_COMMENTS = 200;
const NUM_LIKES = 500;
const NUM_COMMENT_LIKES = 300;
const NUM_FOLLOWS = 30;

// --- HELPER FUNCTIONS ---
async function clearTables() {
  console.log("🧹 Clearing existing data...");
  await db.delete(likes);
  await db.delete(comments);
  await db.delete(follows);
  await db.delete(posts);
  await db.delete(users);
  console.log("✅ Tables cleared");
}

async function createUsers() {
  console.log("👤 Creating users...");
  const userList = [];

  const bios = [
    "Marxist-Leninist | Anti-imperialist | Class struggle now ✊",
    "Socialist | Feminist | Organizer 🌹",
    "Comrade | Writer | Revolutionary 📖",
    "Class conscious | Union member | Anti-capitalist 🚩",
    "Trotskyist | Critical of Stalinism | Permanent revolution 🔥",
    "Anarcho-communist | Mutual aid | No gods no masters Ⓐ",
    "Democratic socialist | M4A | Green New Deal 🌎",
    "Leninist | Anti-revisionist | MLM ☭",
    "Council communist | Workers self-management | Anti-bureaucracy ⚙️",
    "Syndicalist | Direct action | One big union ✊",
    "Eco-socialist | Degrowth | Climate justice 🌿",
    "Feminist socialist | Reproductive justice | Intersectionality 🟣",
    "LGBTQ+ liberation | Queer anarchist | Smash the state 🏳️‍🌈",
    "Anti-fascist | Anti-racist | No pasarán 🚫",
    "Palestine solidarity | BDS | Free Palestine 🇵🇸",
    "Anti-NATO | Peace activist | No war but class war ☮️",
    "Internationalist | Solidarity forever | Workers of the world unite 🌍",
    "Third Worldist | Anti-colonialism | Decolonization ✊🏿",
    "Marxist humanist | Against alienation | For human flourishing 🧠",
    "Autonomist | Operaismo | Workerism | Anti-work 💪",
  ];

  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet
      .username({ firstName, lastName })
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const email = faker.internet
      .email({ firstName, lastName })
      .toLowerCase();

    const fakeUser = {
      username,
      name: `${firstName} ${lastName}`,
      email,
      bio: faker.helpers.arrayElement(bios),
      avatar: faker.image.avatar(),
      password_hash: await bcrypt.hash("password123", 10),
      created_at: faker.date.past({ years: 2 }),
    };

    await db.insert(users).values(fakeUser);

    const [insertedUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (insertedUser) {
      userList.push(insertedUser);
    }
  }

  console.log(`✅ Created ${userList.length} users`);
  return userList;
}

async function createPosts(users: any[]) {
  console.log("📝 Creating posts...");
  const postList = [];

  const topics = [
    "The Dialectics of Imperialism in the 21st Century",
    "Base and Superstructure: A Re-evaluation",
    "On the Contradictions of Neoliberalism",
    "The State as an Instrument of Class Rule",
    "Historical Materialism and the Current Crisis",
    "Alienation and Commodity Fetishism",
    "The Role of the Vanguard Party",
    "Imperialism and Unequal Exchange",
    "The Transition to Socialism: Debates and Strategies",
    "Feminism and Marxism: An Unfinished Synthesis",
    "Ecology and Socialism: A Necessary Alliance",
    "The Labor Theory of Value in Modern Capitalism",
    "Reform or Revolution: A False Dichotomy?",
    "The Question of National Liberation",
    "Cultural Hegemony and Counter-Hegemony",
    "The State and Revolution Revisited",
    "Imperialism and the Global South",
    "The Crisis of Bourgeois Democracy",
    "Socialism and the Question of Freedom",
    "The Communist Manifesto in the 21st Century",
  ];

  for (let i = 0; i < NUM_POSTS; i++) {
    const author = faker.helpers.arrayElement(users);
    const title =
      faker.helpers.arrayElement(topics) + ` — ${faker.lorem.words(3)}`;
    const content = faker.lorem.paragraphs(3);
    const status = faker.helpers.arrayElement(["draft", "published"]);
    const likeCount = faker.number.int({ min: 0, max: 150 });
    const sentiment = faker.number.float({
      min: -1,
      max: 1,
      fractionDigits: 2,
    });
    const createdAt = faker.date.past({ years: 1 });

    const postData = {
      user_id: author.id,
      title,
      content,
      status,
      image_path: faker.helpers.maybe(() => faker.image.url(), {
        probability: 0.3,
      }),
      like_count: likeCount,
      score: sentiment,
      created_at: createdAt,
      updated_at: createdAt,
    };

    await db.insert(posts).values(postData);

    const [insertedPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.title, title))
      .limit(1);

    if (insertedPost) {
      postList.push(insertedPost);
    }
  }

  console.log(`✅ Created ${postList.length} posts`);
  return postList;
}

async function createComments(users: any[], posts: any[]) {
  console.log("💬 Creating comments...");
  const commentList = [];

  for (let i = 0; i < NUM_COMMENTS; i++) {
    const author = faker.helpers.arrayElement(users);
    const targetPost = faker.helpers.arrayElement(posts);
    const content = faker.lorem.sentences(2);
    const likeCount = faker.number.int({ min: 0, max: 20 });
    const sentiment = faker.number.float({
      min: -1,
      max: 1,
      fractionDigits: 2,
    });
    const createdAt = faker.date.between({
      from: targetPost.created_at,
      to: new Date(),
    });

    await db.insert(comments).values({
      user_id: author.id,
      post_id: targetPost.id,
      content,
      like_count: likeCount,
      score: sentiment,
      created_at: createdAt,
    });

    const [insertedComment] = await db
      .select()
      .from(comments)
      .where(eq(comments.content, content))
      .limit(1);

    if (insertedComment) {
      commentList.push(insertedComment);
    }
  }

  console.log(`✅ Created ${commentList.length} comments`);
  return commentList;
}

async function createLikes(users: any[], posts: any[], commentsList: any[]) {
  console.log("❤️ Creating post likes...");
  const likeSet = new Set();

  // Post likes
  for (let i = 0; i < NUM_LIKES; i++) {
    const user = faker.helpers.arrayElement(users);
    const post = faker.helpers.arrayElement(posts);
    const key = `${user.id}-${post.id}`;

    if (!likeSet.has(key)) {
      likeSet.add(key);

      const existing = await db
        .select()
        .from(likes)
        .where(
          and(
            eq(likes.user_id, user.id),
            eq(likes.post_id, post.id),
            eq(likes.comment_id, null)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        await db.insert(likes).values({
          user_id: user.id,
          post_id: post.id,
          comment_id: null,
          created_at: faker.date.past({ years: 1 }),
        });
      }
    }
  }

  console.log(`✅ Created ${likeSet.size} post likes`);

  console.log("💬 Creating comment likes...");
  const commentLikeSet = new Set();

  // Comment likes
  for (let i = 0; i < NUM_COMMENT_LIKES; i++) {
    const user = faker.helpers.arrayElement(users);
    const comment = faker.helpers.arrayElement(commentsList);
    const key = `${user.id}-${comment.id}`;

    if (!commentLikeSet.has(key)) {
      commentLikeSet.add(key);

      // Check if this like already exists
      const existing = await db
        .select()
        .from(likes)
        .where(
          and(
            eq(likes.user_id, user.id),
            eq(likes.comment_id, comment.id)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        await db.insert(likes).values({
          user_id: user.id,
          post_id: comment.post_id,
          comment_id: comment.id,
          created_at: faker.date.past({ years: 1 }),
        });
      }
    }
  }

  console.log(`✅ Created ${commentLikeSet.size} comment likes`);
}

async function createFollows(users: any[]) {
  console.log("🔗 Creating follows...");
  const followSet = new Set();

  for (let i = 0; i < NUM_FOLLOWS; i++) {
    const follower = faker.helpers.arrayElement(users);
    let following = faker.helpers.arrayElement(users);

    if (following.id === follower.id) {
      continue;
    }

    const key = `${follower.id}-${following.id}`;
    if (followSet.has(key)) {
      continue;
    }

    const existing = await db
      .select()
      .from(follows)
      .where(
        and(
          eq(follows.follower_id, follower.id),
          eq(follows.following_id, following.id)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      await db.insert(follows).values({
        follower_id: follower.id,
        following_id: following.id,
        created_at: faker.date.past({ years: 1 }),
      });
      followSet.add(key);
    }
  }

  console.log(`✅ Created ${followSet.size} follows`);
}

// --- MAIN ---
async function seed() {
  console.log("🌱 Seeding database...");

  try {
    await clearTables();

    const createdUsers = await createUsers();
    const createdPosts = await createPosts(createdUsers);
    const createdComments = await createComments(createdUsers, createdPosts);

    // Likes need both posts and comments
    await createLikes(createdUsers, createdPosts, createdComments);
    await createFollows(createdUsers);

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
