USE mydb;

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE likes;
TRUNCATE TABLE comments;
TRUNCATE TABLE follows;
TRUNCATE TABLE posts;
TRUNCATE TABLE users;

SET FOREIGN_KEY_CHECKS=1;

-- -----------------------------------------------
-- USERS
-- -----------------------------------------------

INSERT INTO users
(username,name,email,bio,password_hash,created_at)
VALUES
('alice','Alice Martin','alice@test.com','Coffee addict and backend engineer.','hash',NOW()-INTERVAL 250 DAY),
('bob','Bob Jones','bob@test.com','Linux enthusiast.','hash',NOW()-INTERVAL 245 DAY),
('charlie','Charlie Smith','charlie@test.com','Photography and travel.','hash',NOW()-INTERVAL 240 DAY),
('diana','Diana Brown','diana@test.com','Book lover.','hash',NOW()-INTERVAL 238 DAY),
('eve','Eve Wilson','eve@test.com','Cybersecurity student.','hash',NOW()-INTERVAL 230 DAY),
('frank','Frank White','frank@test.com','Game developer.','hash',NOW()-INTERVAL 220 DAY),
('grace','Grace Miller','grace@test.com','Math nerd.','hash',NOW()-INTERVAL 215 DAY),
('henry','Henry Moore','henry@test.com','Runner and photographer.','hash',NOW()-INTERVAL 200 DAY),
('irene','Irene Green','irene@test.com','UX designer.','hash',NOW()-INTERVAL 190 DAY),
('jack','Jack Black','jack@test.com','Open source contributor.','hash',NOW()-INTERVAL 185 DAY);

-- -----------------------------------------------
-- FOLLOWS
-- -----------------------------------------------

INSERT INTO follows VALUES
(1,2,NOW()-INTERVAL 180 DAY),
(1,3,NOW()-INTERVAL 178 DAY),
(1,5,NOW()-INTERVAL 170 DAY),
(2,1,NOW()-INTERVAL 175 DAY),
(2,3,NOW()-INTERVAL 150 DAY),
(2,6,NOW()-INTERVAL 149 DAY),
(3,1,NOW()-INTERVAL 170 DAY),
(3,2,NOW()-INTERVAL 160 DAY),
(3,4,NOW()-INTERVAL 150 DAY),
(4,1,NOW()-INTERVAL 140 DAY),
(4,5,NOW()-INTERVAL 130 DAY),
(5,1,NOW()-INTERVAL 125 DAY),
(5,2,NOW()-INTERVAL 120 DAY),
(5,6,NOW()-INTERVAL 110 DAY),
(6,5,NOW()-INTERVAL 105 DAY),
(6,7,NOW()-INTERVAL 100 DAY),
(7,8,NOW()-INTERVAL 90 DAY),
(8,9,NOW()-INTERVAL 85 DAY),
(9,10,NOW()-INTERVAL 80 DAY),
(10,1,NOW()-INTERVAL 75 DAY);

-- -----------------------------------------------
-- POSTS
-- -----------------------------------------------

INSERT INTO posts
(user_id,title,content,status,created_at,updated_at)
VALUES

(1,'Building a tiny kernel',
'Finally got paging working.',
'published',
NOW()-INTERVAL 90 DAY,
NOW()-INTERVAL 90 DAY),

(2,'Fedora vs Debian',
'I switched again...',
'published',
NOW()-INTERVAL 75 DAY,
NOW()-INTERVAL 75 DAY),

(3,'Trip to Iceland',
'Some amazing landscapes.',
'published',
NOW()-INTERVAL 60 DAY,
NOW()-INTERVAL 60 DAY),

(4,'Finished reading Dune',
'Absolutely worth it.',
'published',
NOW()-INTERVAL 45 DAY,
NOW()-INTERVAL 45 DAY),

(5,'Reverse engineering notes',
'Sharing a few tricks.',
'published',
NOW()-INTERVAL 30 DAY,
NOW()-INTERVAL 30 DAY),

(6,'My first indie game',
'After one year of work...',
'published',
NOW()-INTERVAL 15 DAY,
NOW()-INTERVAL 15 DAY),

(7,'Interesting theorem',
'Proof inside.',
'published',
NOW()-INTERVAL 7 DAY,
NOW()-INTERVAL 7 DAY),

(8,'Morning marathon',
'Managed a new personal best.',
'published',
NOW()-INTERVAL 3 DAY,
NOW()-INTERVAL 3 DAY),

(9,'Redesign thoughts',
'Trying a cleaner interface.',
'published',
NOW()-INTERVAL 18 HOUR,
NOW()-INTERVAL 18 HOUR),

(10,'Open source release',
'Version 2.0 is finally here.',
'published',
NOW()-INTERVAL 2 HOUR,
NOW()-INTERVAL 2 HOUR);

-- -----------------------------------------------
-- COMMENTS
-- -----------------------------------------------

INSERT INTO comments
(user_id,post_id,content,created_at)
VALUES

(2,1,'Really impressive work.',NOW()-INTERVAL 89 DAY),
(3,1,'Can you publish the source?',NOW()-INTERVAL 89 DAY),
(4,1,'I disagree with your memory allocator.',NOW()-INTERVAL 88 DAY),
(5,1,'Excellent explanation.',NOW()-INTERVAL 88 DAY),

(1,2,'I still prefer Debian.',NOW()-INTERVAL 74 DAY),
(6,2,'Fedora worked better for me.',NOW()-INTERVAL 73 DAY),
(7,2,'Interesting benchmark.',NOW()-INTERVAL 73 DAY),

(5,3,'Amazing photos!',NOW()-INTERVAL 58 DAY),
(8,3,'Looks beautiful.',NOW()-INTERVAL 57 DAY),

(9,4,'One of my favorite books.',NOW()-INTERVAL 43 DAY),
(10,4,'Couldnt finish it personally.',NOW()-INTERVAL 42 DAY),

(1,5,'Very informative.',NOW()-INTERVAL 29 DAY),
(2,5,'I think section 3 needs more detail.',NOW()-INTERVAL 29 DAY),
(6,5,'Saved this post.',NOW()-INTERVAL 28 DAY),

(7,6,'Congrats!',NOW()-INTERVAL 14 DAY),
(8,6,'Looks fun.',NOW()-INTERVAL 13 DAY),
(9,6,'Controls feel clunky though.',NOW()-INTERVAL 13 DAY),

(10,7,'Nice proof.',NOW()-INTERVAL 6 DAY),
(3,8,'Congrats on the marathon!',NOW()-INTERVAL 2 DAY),
(4,9,'Love the cleaner UI.',NOW()-INTERVAL 10 HOUR),
(5,10,'Downloaded it already.',NOW()-INTERVAL 1 HOUR);

-- -----------------------------------------------
-- LIKES
-- -----------------------------------------------

INSERT INTO likes(user_id,post_id)
VALUES

(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),

(1,2),
(3,2),
(5,2),
(6,2),

(1,3),
(2,3),
(4,3),
(8,3),
(9,3),

(2,4),
(5,4),
(7,4),

(1,5),
(3,5),
(4,5),
(6,5),
(7,5),
(8,5),
(9,5),

(1,6),
(2,6),
(3,6),
(5,6),
(8,6),

(10,7),
(2,7),

(3,8),
(5,8),
(7,8),
(9,8),

(1,9),
(2,9),
(4,9),
(5,9),

(1,10),
(2,10),
(3,10),
(4,10),
(5,10),
(6,10),
(7,10),
(8,10);

-- -----------------------------------------------
-- COMMENT LIKES
-- -----------------------------------------------

INSERT INTO likes(user_id,post_id,comment_id)
VALUES
(1,1,1),
(3,1,1),
(5,1,1),

(2,1,2),
(4,1,2),

(6,2,5),
(7,2,6),

(8,3,8),
(9,3,8),

(1,5,12),
(4,5,12),
(6,5,12),

(5,6,15),
(10,7,18),
(1,10,21);

-- -----------------------------------------------
-- UPDATE COUNTS
-- -----------------------------------------------

UPDATE posts p
SET like_count=(
    SELECT COUNT(*)
    FROM likes l
    WHERE l.post_id=p.id
      AND l.comment_id IS NULL
);

UPDATE comments c
SET like_count=(
    SELECT COUNT(*)
    FROM likes l
    WHERE l.comment_id=c.id
);
