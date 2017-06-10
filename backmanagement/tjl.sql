-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.5-10.0.14-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 user 的数据库结构
CREATE DATABASE IF NOT EXISTS `user` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `user`;


-- 导出  表 user.address 结构
CREATE TABLE IF NOT EXISTS `address` (
  `username` char(50) NOT NULL,
  `address` varchar(550) NOT NULL,
  `name` char(50) NOT NULL,
  `phone` char(50) NOT NULL,
  `mail` char(50) NOT NULL,
  `able` char(50) NOT NULL DEFAULT 'flase',
  `num` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.address 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` (`username`, `address`, `name`, `phone`, `mail`, `able`, `num`) VALUES
	('12345678903', '广东省广州市荔湾区多萨达', '倒萨', '12345678909', '123456', 'false', '1486372773598');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;


-- 导出  表 user.buycar 结构
CREATE TABLE IF NOT EXISTS `buycar` (
  `productid` int(11) NOT NULL,
  `username` char(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `src` char(50) NOT NULL,
  `money` char(50) NOT NULL,
  `title` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.buycar 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `buycar` DISABLE KEYS */;
/*!40000 ALTER TABLE `buycar` ENABLE KEYS */;


-- 导出  表 user.buylist 结构
CREATE TABLE IF NOT EXISTS `buylist` (
  `listnum` char(50) NOT NULL,
  `username` char(50) NOT NULL,
  `product` varchar(6000) NOT NULL,
  `payway` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.buylist 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `buylist` DISABLE KEYS */;
/*!40000 ALTER TABLE `buylist` ENABLE KEYS */;


-- 导出  表 user.ordergoods 结构
CREATE TABLE IF NOT EXISTS `ordergoods` (
  `name` char(50) NOT NULL,
  `address` char(50) NOT NULL,
  `phone` char(50) NOT NULL,
  `product` varchar(300) NOT NULL,
  `username` char(50) NOT NULL,
  `ordernum` char(50) NOT NULL,
  `creattime` char(50) NOT NULL,
  `payway` char(50) NOT NULL,
  `state` char(50) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.ordergoods 的数据：~11 rows (大约)
/*!40000 ALTER TABLE `ordergoods` DISABLE KEYS */;
INSERT INTO `ordergoods` (`name`, `address`, `phone`, `product`, `username`, `ordernum`, `creattime`, `payway`, `state`) VALUES
	('的撒打算', '广东省广州市白云区的士速递', '12345678999', '{"productid":"3","username":"12345678903","amount":"1","src":"img/pika.jpg","money":"10","title":"小老板tao kae noi 经典原味脆紫菜32g"}', '12345678903', '1487296355349', 'Fri Feb 17 2017', '支付宝', 'false'),
	('的撒打算', '广东省广州市白云区的士速递', '12345678999', '{"productid":"3","username":"12345678903","amount":"1","src":"img/pika.jpg","money":"10","title":"小老板tao kae noi 经典原味脆紫菜32g"}', '12345678903', '1487296590135', 'Fri Feb 17 2017', '不给钱', 'false'),
	('的撒打算', '广东省广州市白云区的士速递', '12345678999', '{"productid":"6","username":"12345678903","amount":"3","src":"img/cheni.jpg","money":"15","title":"lipo 奶油味面包干 200克"}', '12345678903', '1487297676890', 'Fri Feb 17 2017', '微信支付', 'false'),
	('的撒打算', '广东省广州市白云区的士速递', '12345678999', '{"productid":"3","username":"12345678903","amount":"1","src":"img/pika.jpg","money":"10","title":"小老板tao kae noi 经典原味脆紫菜32g"}', '12345678903', '1487301084884', 'Fri Feb 17 2017', '支付宝', 'false'),
	('的撒打算', '广东省广州市白云区的士速递', '12345678999', '{"productid":"6","username":"12345678903","amount":"2","src":"img/cheni.jpg","money":"15","title":"lipo 奶油味面包干 200克"}', '12345678903', '1487301084884', 'Fri Feb 17 2017', '支付宝', 'false'),
	('爱爱爱', '广东省深圳市罗湖区多萨达', '12345678909', '{"productid":"3","username":"12345678903","amount":"3","src":"img/pika.jpg","money":"10","title":"小老板tao kae noi 经典原味脆紫菜32g"}', '12345678903', '1487302780947', 'Fri Feb 17 2017', '支付宝', 'false');
/*!40000 ALTER TABLE `ordergoods` ENABLE KEYS */;


-- 导出  表 user.product 结构
CREATE TABLE IF NOT EXISTS `product` (
  `productid` int(11) NOT NULL AUTO_INCREMENT,
  `money` char(50) NOT NULL DEFAULT '0',
  `title` char(50) NOT NULL DEFAULT '0',
  `src` char(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- 正在导出表  user.product 的数据：~37 rows (大约)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`productid`, `money`, `title`, `src`) VALUES
	(2, '10', '小老板tao kae noi 经典原味脆紫菜32g', 'img/pika.jpg'),
	(3, '10', '小老板tao kae noi 经典原味脆紫菜32g', 'img/pika.jpg'),
	(4, '10', '小老板tao kae noi 经典原味脆紫菜32g', 'img/pika.jpg'),
	(6, '15', 'lipo 奶油味面包干 200克', 'img/cheni.jpg'),
	(7, '15', 'lipo 奶油味面包干 200克', 'img/cheni.jpg'),
	(8, '15', 'lipo 奶油味面包干 200克', 'img/cheni.jpg'),
	(9, '13', '思念 茉莉花汤圆 240g', 'img/kami.jpg'),
	(10, '13', '思念 茉莉花汤圆 240g', 'img/kami.jpg'),
	(11, '13', '思念 茉莉花汤圆 240g', 'img/kami.jpg'),
	(12, '13', '思念 茉莉花汤圆 240g', 'img/kami.jpg'),
	(13, '15', '思念 鲜美猪肉玉汤圆 320g', 'img/shuijian.jpg'),
	(14, '15', '思念 鲜美猪肉玉汤圆 320g', 'img/shuijian.jpg'),
	(15, '15', '思念 鲜美猪肉玉汤圆 320g', 'img/shuijian.jpg'),
	(16, '15', '思念 鲜美猪肉玉汤圆 320g', 'img/shuijian.jpg'),
	(17, '21', '思念 彩玉八宝玉汤圆 320g', 'img/xiaohuo.jpg'),
	(18, '21', '思念 彩玉八宝玉汤圆 320g', 'img/xiaohuo.jpg'),
	(19, '21', '思念 彩玉八宝玉汤圆 320g', 'img/xiaohuo.jpg'),
	(20, '21', '思念 彩玉八宝玉汤圆 320g', 'img/xiaohuo.jpg'),
	(21, '8', '台湾 绿力 芒果汁饮料 490ml', 'img/huokong.jpg'),
	(22, '8', '台湾 绿力 芒果汁饮料 490ml', 'img/huokong.jpg'),
	(23, '8', '台湾 绿力 芒果汁饮料 490ml', 'img/huokong.jpg'),
	(24, '8', '台湾 绿力 芒果汁饮料 490ml', 'img/huokong.jpg'),
	(25, '12', '界界乐 草莓乳酸菌 100ml*4', 'img/penhuo.jpg'),
	(26, '12', '界界乐 草莓乳酸菌 100ml*4', 'img/penhuo.jpg'),
	(27, '12', '界界乐 草莓乳酸菌 100ml*4', 'img/penhuo.jpg'),
	(28, '12', '界界乐 草莓乳酸菌 100ml*4', 'img/penhuo.jpg'),
	(29, '14', '海底捞 清汤火锅底料 110g', 'img/miaowa.jpg'),
	(30, '14', '海底捞 清汤火锅底料 110g', 'img/miaowa.jpg'),
	(31, '14', '海底捞 清汤火锅底料 110g', 'img/miaowa.jpg'),
	(32, '14', '海底捞 清汤火锅底料 110g', 'img/miaowa.jpg'),
	(33, '33', '启泰 袋裝银耳(雪耳) 200g', 'img/miaowah.jpg'),
	(34, '33', '启泰 袋裝银耳(雪耳) 200g', 'img/miaowah.jpg'),
	(35, '33', '启泰 袋裝银耳(雪耳) 200g', 'img/miaowah.jpg'),
	(36, '33', '启泰 袋裝银耳(雪耳) 200g', 'img/miaowah.jpg'),
	(37, '14', '北纯 有机红小豆 400g', 'img/youji.jpg'),
	(38, '14', '北纯 有机红小豆 400g', 'img/youji.jpg'),
	(39, '14', '北纯 有机红小豆 400g', 'img/youji.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;


-- 导出  表 user.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `indexid` int(11) NOT NULL AUTO_INCREMENT,
  `phone` char(50) NOT NULL,
  `account` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  PRIMARY KEY (`indexid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- 正在导出表  user.user 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`indexid`, `phone`, `account`, `password`) VALUES
	(8, '12345678903', '123400去', 'wasd2500'),
	(9, '12345678901', '发的发生', '12345678'),
	(10, '12345678905', '开机快', '12345678');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


-- 导出  表 user.vipuser 结构
CREATE TABLE IF NOT EXISTS `vipuser` (
  `account` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  `phone` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.vipuser 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `vipuser` DISABLE KEYS */;
INSERT INTO `vipuser` (`account`, `password`, `phone`) VALUES
	('张三锋', '12345678', '12345678909');
/*!40000 ALTER TABLE `vipuser` ENABLE KEYS */;


-- 导出  表 user.vipuserlist 结构
CREATE TABLE IF NOT EXISTS `vipuserlist` (
  `userlist` char(50) DEFAULT NULL,
  `productlist` char(50) DEFAULT NULL,
  `changpass` char(50) DEFAULT NULL,
  `logout` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  user.vipuserlist 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `vipuserlist` DISABLE KEYS */;
INSERT INTO `vipuserlist` (`userlist`, `productlist`, `changpass`, `logout`) VALUES
	('用户信息', '商品信息', '修改密码', '退出登录');
/*!40000 ALTER TABLE `vipuserlist` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
