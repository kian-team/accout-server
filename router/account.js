const router = require('koa-router')();
const Account = require('../controllers/account');
// 查询用户账单列表
router.get('/oa/account/list', Account.list)

// 添加支出信息
router.post('/oa/account/addacount', Account.add)

// 删除信息
router.delete('/oa/account/delete', Account.delete);

// 更新账单
router.put('/oa/account/update', Account.update);
module.exports = router;