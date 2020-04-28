const router = require('koa-router')();
const Utils = require('../utils');
const Tips = require('../utils/tip');
const db = require('../db');

// 查询用户账单列表
router.get('/oa/user/list', async (ctx, next) => {
  let { uid} = ctx.state || {};
  
  let sql = 'SELECT account_name,account_desc,account_time, account_type, account_id FROM t_account WHERE uid=?', value = [uid];
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      ctx.body = { ...Tips[0], data: {total: res.length, list: res }};
    } else if (res.length === 0) {
      ctx.body = Tips[1003];
    } else {
      ctx.body = Tips[1005];
    }
  }).catch(e => {
    ctx.body = Tips[1005];
  })
})

router.post('/oa/user/addacount', async (ctx, next) => {
  let { uid } = ctx.state || {};
  let data = Utils.filter(ctx.request.body, ['account_name', 'account_desc', 'account_type', 'account_money']);
  let res = Utils.formatData(data, [
    { key: 'account_name', type: 'string' },
    { key: 'account_desc', type: 'string' },
    { key: 'account_type', type: 'string' },
    { key: 'account_money', type: 'string' },
  ]);
  let account_time = new Date();
  let { account_name, account_desc, account_type, account_money } = data;
  let sql = ' INSERT INTO  t_account (uid, account_name, account_desc,account_type, account_money, account_time ) VALUES (?,?,?,?,?,?)', value = [uid, account_name, account_desc, account_type, account_money, account_time];
  await db.query(sql, value).then(res => {
    if (res.affectedRows == 1) {
      ctx.body = {
        ...Tips[0],
        data:{
          message:'创建成功!'
        }
      }
    }
  }).catch(e => {

    ctx.body = Tips[1002];

  });
})

module.exports = router;