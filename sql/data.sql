/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : account_db

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-05-07 11:01:24
*/

-- ----------------------------
-- Table structure for `t_earn`
-- ----------------------------
DROP TABLE IF EXISTS `t_earn`;
CREATE TABLE `t_earn` (
  `u_id` varchar(50) NOT NULL COMMENT '用户id',
  `t_id` int(11) NOT NULL COMMENT '收入id',
  `t_earn` int(11) unsigned zerofill NOT NULL COMMENT '收入金额',
  `t_date` date NOT NULL COMMENT '时间',
  `t_comment` varchar(255) DEFAULT NULL COMMENT '备注信息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_earn
-- ----------------------------
INSERT INTO `t_earn` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', '99', '00000000032', '2020-05-07', '2222');
INSERT INTO `t_earn` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', '199', '00000003000', '2020-05-07', '123123');

-- ----------------------------
-- Table structure for `t_pay`
-- ----------------------------
DROP TABLE IF EXISTS `t_pay`;
CREATE TABLE `t_pay` (
  `u_id` varchar(50) NOT NULL COMMENT '用户id',
  `t_id` int(11) NOT NULL COMMENT '支出id',
  `t_spend` int(11) unsigned zerofill NOT NULL COMMENT '支出花费',
  `t_date` date DEFAULT NULL COMMENT '消费时间',
  `t_comment` varchar(255) DEFAULT NULL COMMENT '备注信息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_pay
-- ----------------------------
INSERT INTO `t_pay` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', '1', '00000000020', '2020-05-07', '123');
INSERT INTO `t_pay` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', '3', '00000000021', '2020-05-07', '111');
INSERT INTO `t_pay` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', '6', '00000000012', '2020-05-07', '333');

-- ----------------------------
-- Table structure for `t_type`
-- ----------------------------
DROP TABLE IF EXISTS `t_type`;
CREATE TABLE `t_type` (
  `t_id` int(11) NOT NULL COMMENT '支出收入类型id',
  `t_type` varchar(255) DEFAULT '其他' COMMENT '支出收入类型'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_type
-- ----------------------------
INSERT INTO `t_type` VALUES ('99', '其他');
INSERT INTO `t_type` VALUES ('4', '出行');
INSERT INTO `t_type` VALUES ('199', '工资');
INSERT INTO `t_type` VALUES ('6', '房租');
INSERT INTO `t_type` VALUES ('3', '日用');
INSERT INTO `t_type` VALUES ('5', '服饰');
INSERT INTO `t_type` VALUES ('2', '购物');
INSERT INTO `t_type` VALUES ('1', '餐饮');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `u_id` varchar(50) NOT NULL COMMENT '用户id',
  `u_name` varchar(50) NOT NULL COMMENT '用户昵称',
  `u_phone` char(11) DEFAULT NULL COMMENT '用户手机',
  `u_gender` char(2) DEFAULT NULL COMMENT '用户性别',
  `u_password` varchar(50) NOT NULL COMMENT '用户密码',
  `u_delete` int(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '用户是否删除',
  `u_date` date NOT NULL COMMENT '用户创建时间',
  `u_account` varchar(30) NOT NULL COMMENT '用户账号',
  `u_nickname` varchar(30) NOT NULL DEFAULT '' COMMENT '用户昵称',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('8e9a2a90-882f-11ea-bed2-6533bfd03577', 'hello', '1', '1', 'e10adc3949ba59abbe56e057f20f883e', '0', '2020-05-07', '', '');
