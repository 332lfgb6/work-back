/*
 Navicat MySQL Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : tiktok

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 19/10/2022 09:37:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 203 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (202, 'follow', 135, 43);

-- ----------------------------
-- Table structure for at_video
-- ----------------------------
DROP TABLE IF EXISTS `at_video`;
CREATE TABLE `at_video`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `video_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of at_video
-- ----------------------------
INSERT INTO `at_video` VALUES (1, 41, 43);
INSERT INTO `at_video` VALUES (2, 42, 44);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `reply_user_id` int(11) NULL DEFAULT 0,
  `video_id` int(11) NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pub_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 125 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (123, 43, 0, 43, 'lisa漂亮啊', '2022-10-19 09:23:07', 0);
INSERT INTO `comment` VALUES (121, 43, 0, 38, '漂亮啊', '2022-10-15 05:49:15', 0);
INSERT INTO `comment` VALUES (119, 43, 0, 38, '漂亮的中式婚礼。', '2022-10-15 05:22:37', 0);
INSERT INTO `comment` VALUES (110, 40, 0, 38, '漂亮。', '2022-10-13 06:56:59', 0);
INSERT INTO `comment` VALUES (109, 37, 0, 34, 'kkkkkkkkk', '2022-10-13 06:49:51', 108);
INSERT INTO `comment` VALUES (105, 37, 0, 38, '天长地久', '2022-10-13 06:36:50', 0);
INSERT INTO `comment` VALUES (106, 37, 0, 38, '恭喜。', '2022-10-13 06:37:05', 105);
INSERT INTO `comment` VALUES (108, 37, 0, 34, 'zzzzzzzzzz', '2022-10-13 06:49:43', 0);

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuser_id` int(11) NULL DEFAULT NULL COMMENT '发起关注的人',
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 136 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES (135, 40, 43);

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `video_id` int(11) NULL DEFAULT NULL,
  `zaned` tinyint(4) NULL DEFAULT 0,
  `collected` tinyint(4) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 756 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES (751, 43, 45, 0, 0);
INSERT INTO `history` VALUES (750, 43, 44, 1, 0);
INSERT INTO `history` VALUES (749, 43, 43, 1, 0);
INSERT INTO `history` VALUES (746, 43, 41, 0, 0);
INSERT INTO `history` VALUES (745, 43, 37, 0, 0);
INSERT INTO `history` VALUES (755, 40, 45, 0, 0);
INSERT INTO `history` VALUES (754, 40, 44, 0, 0);
INSERT INTO `history` VALUES (742, 43, 40, 0, 0);
INSERT INTO `history` VALUES (741, 43, 36, 0, 0);
INSERT INTO `history` VALUES (740, 43, 38, 1, 0);
INSERT INTO `history` VALUES (729, 37, 36, 0, 0);
INSERT INTO `history` VALUES (753, 40, 43, 0, 0);
INSERT INTO `history` VALUES (728, 37, 38, 0, 0);

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES (61, '5263cf2c-9dcd-4c9a-a130-fc4e33bd846f', 40);
INSERT INTO `login` VALUES (55, 'f718d50a-dc8e-416f-b84d-0c5453ee387f', 40);
INSERT INTO `login` VALUES (52, '87d50069-b5c6-4905-bfbe-941456b8229a', 37);
INSERT INTO `login` VALUES (49, 'e55c9c03-280d-49a1-aede-6898510b39e9', 37);
INSERT INTO `login` VALUES (48, 'f8c9888b-5974-4766-9837-9ccb76722f5c', 37);
INSERT INTO `login` VALUES (45, '67ab3d22-defd-47c5-8f3e-1aa95c8a056e', 40);
INSERT INTO `login` VALUES (42, 'c7f27e1a-3fe0-4009-b7f9-7081f09f0e13', 37);
INSERT INTO `login` VALUES (47, '9f5327d8-5492-440d-811b-c080178c00d1', 37);

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `music_filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `music_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `use_num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES (14, '1', '1', 'SLANDER', 'SLANDER - Love Is Gone (R3HAB Remix)', 52773);
INSERT INTO `music` VALUES (15, '2', '2', '黑空', 'Dusk Till Dawn（0.8x）', 43296);
INSERT INTO `music` VALUES (16, '3', '3', '果味纯氧', 'Remember Our Summer（0.8速）', 77385);
INSERT INTO `music` VALUES (17, '4', '4', '白凪', 'Falling Down（cery 0.75x）', 12455);
INSERT INTO `music` VALUES (18, '5', '5', 'Kings', 'Wake（0.8x）', 73540);
INSERT INTO `music` VALUES (19, '6', '6', 'XiaoF', 'Shadow of the Sun(×0.8 XiaoF)', 52733);
INSERT INTO `music` VALUES (20, '7', '7', '8Bit Remix', 'Something Just Like This (8bit Remix)', 66535);
INSERT INTO `music` VALUES (21, '8', '8', 'Rentz', 'Alone', 22375);
INSERT INTO `music` VALUES (22, '9', '9', 'R.I.O.', 'Like I Love You (Money G Radio Edit)', 93775);
INSERT INTO `music` VALUES (23, '10', '10', 'Suprafive', 'Catch My Breath (Suprafive Remix)', 26735);
INSERT INTO `music` VALUES (24, '11', '11', 'FrogMonster', 'Remember Our Winter', 33765);
INSERT INTO `music` VALUES (25, '12', '12', '北归', 'Fool For You（0.8）', 77358);
INSERT INTO `music` VALUES (26, '13', '13', '2Someone', 'Star Unkind (Lanfranchi & Farina Remix)', 12995);
INSERT INTO `music` VALUES (27, '14', '14', 'Masew', 'Xin Đừng Nhấc Máy（Remix）', 99746);
INSERT INTO `music` VALUES (28, '15', '15', 'Martin Garrix', 'Drown (feat. Clinton Kane) (Alle Farben Remix)', 37685);
INSERT INTO `music` VALUES (29, '16', '16', 'kome', 'unstoppable（抖音版）kome—remix', 72635);

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of topic
-- ----------------------------
INSERT INTO `topic` VALUES (8, '英雄联盟', NULL);
INSERT INTO `topic` VALUES (7, '少爷的烦恼', NULL);
INSERT INTO `topic` VALUES (4, '美食', NULL);
INSERT INTO `topic` VALUES (6, '中式婚礼', '1');
INSERT INTO `topic` VALUES (9, '悬疑', NULL);
INSERT INTO `topic` VALUES (10, '警察', NULL);
INSERT INTO `topic` VALUES (11, '创意广告', '2');
INSERT INTO `topic` VALUES (12, '动漫', '3');
INSERT INTO `topic` VALUES (13, '油画', '3');
INSERT INTO `topic` VALUES (14, 'Lisa', '4');
INSERT INTO `topic` VALUES (15, '西藏', '5');

-- ----------------------------
-- Table structure for topic_video
-- ----------------------------
DROP TABLE IF EXISTS `topic_video`;
CREATE TABLE `topic_video`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NULL DEFAULT NULL,
  `video_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of topic_video
-- ----------------------------
INSERT INTO `topic_video` VALUES (6, 15, 44);
INSERT INTO `topic_video` VALUES (5, 14, 43);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `douyinNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fans_num` int(11) NULL DEFAULT 0,
  `auth` tinyint(4) NULL DEFAULT 0,
  `brief` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (41, '抖音小助手', '6', NULL, 'douyin', 0, 0, NULL);
INSERT INTO `user` VALUES (39, '求婚策划', '5', NULL, 'qiuhuncehua', 0, 0, NULL);
INSERT INTO `user` VALUES (40, '机器人', '0afff0ac-edcb-45cc-b7de-90c4745b3e43', '17788889999', '363207398', 0, 0, NULL);
INSERT INTO `user` VALUES (37, '陶阿狗君', '3', '', 'taoagou', 0, 0, NULL);
INSERT INTO `user` VALUES (38, '沐芝会', '4', NULL, 'mzhdongman', 0, 0, NULL);
INSERT INTO `user` VALUES (35, '电影评论家', '1', NULL, '47502757105', 0, 0, NULL);
INSERT INTO `user` VALUES (36, 'Mushini', '2', NULL, 'MUSHINI.jy', 0, 0, NULL);
INSERT INTO `user` VALUES (42, 'DOU+小助手', '7', NULL, 'doujiaxzs', 0, 0, NULL);
INSERT INTO `user` VALUES (43, '虾壳', '8', '11122223333', 'xiake01234', 0, 0, NULL);
INSERT INTO `user` VALUES (45, 'Bboy猛男阿乐', '9', NULL, 'le520.521', 0, 0, '街舞联动系列原创作者 模仿记得标注');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `music_id` int(11) NULL DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pub_time` datetime NULL DEFAULT NULL,
  `top` tinyint(4) NULL DEFAULT 0,
  `show_index` tinyint(4) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES (43, '今天是Lisa的专场！', '9', 45, 25, '9', NULL, 0, 1);
INSERT INTO `video` VALUES (44, '风总有一刻会停，而我们的热爱不会。', '10', 36, 29, '10', NULL, 0, 1);
INSERT INTO `video` VALUES (45, '韩国农家乐', '8112348e-e906-4d32-b588-de4fdb3e4e22', 43, NULL, '8112348e-e906-4d32-b588-de4fdb3e4e22', NULL, 0, 1);

-- ----------------------------
-- Table structure for zan_comment
-- ----------------------------
DROP TABLE IF EXISTS `zan_comment`;
CREATE TABLE `zan_comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 117 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of zan_comment
-- ----------------------------
INSERT INTO `zan_comment` VALUES (116, 123, 43);
INSERT INTO `zan_comment` VALUES (113, 105, 43);
INSERT INTO `zan_comment` VALUES (112, 110, 43);
INSERT INTO `zan_comment` VALUES (110, 113, 43);
INSERT INTO `zan_comment` VALUES (107, 109, 37);

SET FOREIGN_KEY_CHECKS = 1;
