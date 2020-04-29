const router = require('koa-router')();
const Utils = require('../utils');
const Tips = require('../utils/tip');
const db = require('../db');
const Account = require('../controllers/account');
// 查询用户账单列表
router.get('/oa/user/list', Account.list)

router.post('/oa/user/addacount', Account.add)

module.exports = router;