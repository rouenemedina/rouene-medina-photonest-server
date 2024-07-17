-- CREATE DATABASE photonest_db;

-- USE photonest_db;

-- CREATE TABLE users (
--     user_id int NOT NULL AUTO_INCREMENT,
--     user_first_name varchar(255) NOT NULL,
--     user_last_name varchar(255) NOT NULL,
--     user_email varchar(255) NOT NULL,
--     user_password varchar(255) NOT NULL,
--     user_type varchar(255) NOT NULL,
--     PRIMARY KEY (user_id),
--     UNIQUE KEY user_email (user_email)
-- );

-- CREATE TABLE category (
--     category_id int NOT NULL AUTO_INCREMENT,
--     category_name varchar(255) DEFAULT NULL,
--     PRIMARY KEY (category_id)
-- );

-- CREATE TABLE about (
--     about_id int NOT NULL AUTO_INCREMENT,
--     about_name varchar(255) NOT NULL,
--     about_description text,
--     about_timestamp datetime DEFAULT CURRENT_TIMESTAMP,
--     about_url varchar(255) NOT NULL,
--     user_id int NOT NULL,
--     PRIMARY KEY (about_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- CREATE TABLE blogposts (
--     post_id int NOT NULL AUTO_INCREMENT,
--     post_title varchar(255) NOT NULL,
--     post_content text NOT NULL,
--     post_date date NOT NULL,
--     post_tags varchar(255) DEFAULT NULL,
--     PRIMARY KEY (post_id)
-- );

-- CREATE TABLE comments (
--     comments_id int NOT NULL AUTO_INCREMENT,
--     comments_name varchar(255) NOT NULL,
--     comments_content text NOT NULL,
--     user_id int NOT NULL,
--     PRIMARY KEY (comments_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- CREATE TABLE connect (
--     connect_id int NOT NULL AUTO_INCREMENT,
--     connect_description text,
--     connect_timestamp datetime DEFAULT CURRENT_TIMESTAMP,
--     connect_url varchar(255) NOT NULL,
--     user_id int NOT NULL,
--     PRIMARY KEY (connect_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- CREATE TABLE contact (
--     contact_id int NOT NULL AUTO_INCREMENT,
--     contact_name varchar(255) NOT NULL,
--     contact_email varchar(255) NOT NULL,
--     contact_message text NOT NULL,
--     contact_date datetime DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (contact_id)
-- );

-- CREATE TABLE gallery (
--     gallery_id int NOT NULL AUTO_INCREMENT,
--     gallery_url varchar(255) NOT NULL,
--     gallery_timestamp datetime DEFAULT CURRENT_TIMESTAMP,
--     user_id int NOT NULL,
--     PRIMARY KEY (gallery_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- CREATE TABLE hero (
--     hero_id int NOT NULL AUTO_INCREMENT,
--     hero_description text,
--     hero_timestamp datetime DEFAULT CURRENT_TIMESTAMP,
--     hero_url varchar(255) NOT NULL,
--     user_id int NOT NULL,
--     PRIMARY KEY (hero_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- CREATE TABLE work (
--     work_id int NOT NULL AUTO_INCREMENT,
--     work_title varchar(255) DEFAULT NULL,
--     work_timestamp datetime DEFAULT CURRENT_TIMESTAMP,
--     work_url varchar(255) NOT NULL,
--     user_id int NOT NULL,
--     PRIMARY KEY (work_id),
--     FOREIGN KEY (user_id) REFERENCES users (user_id)
-- );

-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (1,'Rouene','Medina','rouenem@test.ca','$2a$10$xiY3jYOoUnuQ1Y1/RWQgMOU3kWI.DZDMu4EnqeZp4Y933ymudgBdG','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (2,'Roue','Test','roue@test.ca','$2a$10$nA2GPFs3erlBeBXV4HLD6ucZns/TkFAr91K.Z68V51wcWvTA4SMg.','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (3,'2wdsfa','svsdf','sdf@tsgg.com','$2a$10$a52Uy2ZRiCysCDPeVo/BYeg/9UZzRYB056Jc9BMD7A3zMXwYXgpZa','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (4,'Test','Test','test@test.ca','$2a$10$jY1owmEvhUD8HChfpsSjiuf3nMtni3RsFQKa1xneRq5WKaL98Po/W','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (5,'Nick','James','nickjames@test.ca','$2a$10$G21ED8y2reEFX2Wm1Ll/huM9pUTu/LmZ9jQLlsB.jF5H0f2PLoxxi','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (6,'Jane','Gray','janeg@test.ca','$2a$10$7VVgCoZkfG8KjcXVB10grei1zP37erfJu8itrq7/kZ.xbQKAd/GLG','photographer');
-- INSERT INTO users (user_id,user_first_name,user_last_name,user_email,user_password,user_type) VALUES (7,'Client','Test','client@test.ca','$2a$10$V5bEITTBVMRA5Gw9OltYKOE7US8mnbl.nRZ.1b1HOP0YzhWspYFgm','client');

-- INSERT INTO category (category_id,category_name) VALUES (2,'Portrait');
-- INSERT INTO category (category_id,category_name) VALUES (3,'Landscape');
-- INSERT INTO category (category_id,category_name) VALUES (4,'Street');
-- INSERT INTO category (category_id,category_name) VALUES (5,'Fashion');
-- INSERT INTO category (category_id,category_name) VALUES (6,'Sports');
-- INSERT INTO category (category_id,category_name) VALUES (7,'Event');
-- INSERT INTO category (category_id,category_name) VALUES (8,'Architectural');
-- INSERT INTO category (category_id,category_name) VALUES (9,'Food');
-- INSERT INTO category (category_id,category_name) VALUES (10,'Documentary');
-- INSERT INTO category (category_id,category_name) VALUES (11,'Product');


-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (19,'Wedding Bands','2024-07-13 15:09:09','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897748/gpndojunxhze2xa4ulwt.jpg',4);
-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (20,'Scorching Love','2024-07-13 15:09:09','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897748/wlkpstqecyaswlogfe4v.jpg',4);
-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (21,'Fathers Affection','2024-07-13 15:09:09','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897748/yfnzmzlweoclopenbptq.jpg',4);
-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (25,'Sakura Cherry Blossom','2024-07-14 21:19:14','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006354/qjj23hdjnc73q4igooie.jpg',6);
-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (26,'Japanese Kimono','2024-07-14 21:19:14','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006354/ncrjlbkkpl6ppjjnuyim.jpg',6);
-- INSERT INTO work (work_id,work_title,work_timestamp,work_url,user_id) VALUES (27,'Festival','2024-07-14 21:19:14','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006353/xcukf3mzceg1u3kf0x87.jpg',6);

-- INSERT INTO contact (contact_id,contact_name,contact_email,contact_message,contact_date) VALUES (1,'Test Test','test1@test.ca','This is a sample message.','2024-07-07 17:22:27');

-- INSERT INTO connect (connect_id,connect_description,connect_timestamp,connect_url,user_id) VALUES (3,'I would love to hear from you! Feel free to reach out and connect—let us chat about photography, travel destinations, or how we can collaborate on capturing the beauty of the world together.','2024-07-14 21:21:42','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006501/cukuvnef2ardy0wxrl5q.jpg',6);
-- INSERT INTO connect (connect_id,connect_description,connect_timestamp,connect_url,user_id) VALUES (4,'\"Let\'s create timeless memories together. I\'d love to hear about your vision for your special day and capture it through my lens.Contact me today to begin our journey towards unforgettable moments.\"','2024-07-14 22:02:23','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721008943/qw20mkalxoule0sb7nvv.jpg',4);

-- INSERT INTO about (about_id,about_name,about_description,about_timestamp,about_url,user_id) VALUES (1,'Nick','As a dedicated and passionate photographer, I specialize in capturing the magic of weddings and other significant events. My keen eye for detail and love for storytelling allow me to transform every moment into a timeless memory through my lens. I strive to capture vibrant, candid shots that convey the genuine emotions of the day, from joyous laughter to tender glances. My approachable and professional demeanor helps put clients at ease, allowing me to blend seamlessly into the background while capturing the essence of each celebration. My portfolio is a testament to my skill, featuring a stunning array of photos that showcase the beauty and uniqueness of every event I photograph.','2024-07-13 17:22:28','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720905747/axdtcej5wvrl21ct01ri.jpg',4);
-- INSERT INTO about (about_id,about_name,about_description,about_timestamp,about_url,user_id) VALUES (2,'Nick','As a dedicated and passionate photographer, I specialize in capturing the magic of weddings and other significant events. My keen eye for detail and love for storytelling allow me to transform every moment into a timeless memory through my lens. I strive to capture vibrant, candid shots that convey the genuine emotions of the day, from joyous laughter to tender glances. My approachable and professional demeanor helps put clients at ease, allowing me to blend seamlessly into the background while capturing the essence of each celebration. My portfolio is a testament to my skill, featuring a stunning array of photos that showcase the beauty and uniqueness of every event I photograph.','2024-07-13 17:22:28','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720905747/rxn9pxftlwhlvbczicsj.jpg',4);
-- INSERT INTO about (about_id,about_name,about_description,about_timestamp,about_url,user_id) VALUES (5,'Jane','Hello! I\'m Jane, a passionate travel photographer with a keen eye for capturing the world\'s hidden gems. Through my lens, I strive to tell stories of diverse cultures, breathtaking landscapes, and the unique moments that make each destination unforgettable. Whether it\'s the bustling streets of a vibrant city or the serene beauty of a remote village, I aim to create images that transport you to the heart of the places I explore. Join me on this visual journey, and let\'s discover the beauty of our world together.','2024-07-14 21:21:00','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006459/igs04omukr2oa4j7birp.jpg',6);
-- INSERT INTO about (about_id,about_name,about_description,about_timestamp,about_url,user_id) VALUES (6,'Jane','Hello! I\'m Jane, a passionate travel photographer with a keen eye for capturing the world\'s hidden gems. Through my lens, I strive to tell stories of diverse cultures, breathtaking landscapes, and the unique moments that make each destination unforgettable. Whether it\'s the bustling streets of a vibrant city or the serene beauty of a remote village, I aim to create images that transport you to the heart of the places I explore. Join me on this visual journey, and let\'s discover the beauty of our world together.','2024-07-14 21:21:00','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006459/nw9sejtnxmkml9qkozlj.jpg',6);

-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (9,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/rbmrotfxqwdbz0ak61te.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (10,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/jkjfxjtnklowdruwg3wy.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (11,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/afbzwujtlqbsxk40h14d.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (12,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/s3apa3xvwrb2ncyyl2yo.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (13,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897927/pjtex2kscf27xbde4okd.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (14,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/r3muoiyznpqfmcwparfv.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (15,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/dv19lpb60yg0xqwkeltr.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (16,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1720897928/ybvcxumsddyedn2wwyxp.jpg','2024-07-13 15:12:09',4);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (26,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/or1uksxvi4ik6hykj2od.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (27,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/lnezt11adgsi8h4zofg3.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (28,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/jjathrqphiafv6sivncn.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (29,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/fkswdopkbel3tvj6rtl4.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (30,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/ppx5hahe200fnubsbjbu.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (31,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/m98vb9tjiscs8owgwb65.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (32,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/e7grauev8fgjliqzpeho.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (33,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/raihp1318zdl0ifnt5va.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (34,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/vbabgm0yfjuoexpfm8ky.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (35,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/wg1g96mkejaieo0okoys.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (36,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/htemyyiopds4qzezpxac.jpg','2024-07-14 21:22:59',6);
-- INSERT INTO gallery (gallery_id,gallery_url,gallery_timestamp,user_id) VALUES (37,'http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006578/efzp4zz0ukmmdh7qb7qh.jpg','2024-07-14 21:22:59',6);

-- INSERT INTO hero (hero_id,hero_description,hero_timestamp,hero_url,user_id) VALUES (28,'This featured photo captures a heartfelt moment: the groom tenderly kissing the bride\'s forehead amidst lush greenery. It\'s a scene filled with intimacy and love, reflecting the essence of their special day. Join me as I unveil more stories like these, each frame a testament to the beauty of weddings.','2024-07-13 20:34:31','http://res.cloudinary.com/dzqivwyjr/image/upload/v1720917270/vpv9blkdtzptptngvciv.jpg',4);
-- INSERT INTO hero (hero_id,hero_description,hero_timestamp,hero_url,user_id) VALUES (31,'Nestled deep within the serene embrace of a lush Japanese forest stands a magnificent torii gate, its vibrant vermilion hue striking a vivid contrast against the verdant canopy. As a travel photographer, capturing this scene is a dream—the torii, an emblem of transition and sacredness, beckons visitors into a realm of tranquility and reverence. Sunlight filters through the dense foliage, casting dappled patterns on the ground and highlighting the gate\'s elegant curves and ancient woodwork. This torii, framed by the forest\'s timeless beauty, offers a perfect moment of harmony between human craftsmanship and the untouched splendor of the natural world.','2024-07-14 21:17:56','http://res.cloudinary.com/dzqivwyjr/image/upload/v1721006275/ydksorwhyvcjknogqgl3.jpg',6);

-- commit;