const Utils = require('../utils');
const Tips = require('../utils/tip');
const db = require('../db');

const Account = {};
// 查询用户账单列表
Account.list = async (ctx, next) => {
  let { uid } = ctx.state || {};
  let sql = 'SElECT pay.id id, pay.t_spend t_spend, pay.t_date t_date,pay.t_comment t_comment,type.t_type t_type from t_pay pay left join t_type type on pay.t_id = type.t_id where pay.u_id = ?', value = [uid];
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      ctx.body = { ...Tips[0], data: { total: res.length, list: res } };
    } else if (res.length === 0) {
      ctx.body = Tips[1003];
    } else {
      ctx.body = Tips[1005];
    }
  }).catch(e => {
    ctx.body = Tips[1005];
  })
}
Account.add = async (ctx, next) => {
  let { uid } = ctx.state || {};
  let data = Utils.filter(ctx.request.body, ['account_desc', 'account_type', 'account_money']);
  let res = Utils.formatData(data, [
    { key: 'account_desc', type: 'string' },
    { key: 'account_type', type: 'string' },
    { key: 'account_money', type: 'string' },
  ]);
  if (!res) return ctx.body = Tips[1007];
  let account_time = new Date();
  let { account_desc, account_type, account_money } = data;
  let sql = ' INSERT INTO  t_pay (u_id, t_comment,t_id, t_spend, t_date ) VALUES (?,?,?,?,?)', value = [uid, account_desc, account_type, account_money, account_time];
  await db.query(sql, value).then(res => {
    if (res.affectedRows == 1) {
      ctx.body = {
        ...Tips[0],
        data: {
          message: '创建成功!'
        }
      }
    }
  }).catch(e => {

    ctx.body = Tips[1002];

  });
}

Account.delete = async (ctx, next) => {
  let { uid } = ctx.state || {};
  let data = Utils.filter(ctx.request.query, ['account_id',]);
  let res = Utils.formatData(data, [
    { key: 'account_id', type: 'string' },
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { account_id } = data;
  let sql = 'DELETE FROM t_pay WHERE id=?;', value = [account_id];
  await db.query(sql, value).then(res => {
    if (res.affectedRows == 1) {
      ctx.body = {
        ...Tips[0],
        data: {
          message: '删除成功!'
        }
      }
    }else{
      ctx.body = {
        ...Tips[1002],
        data:{
          message:'数据不存在!'
        }
      };
    }
  }).catch(e => {
    ctx.body = Tips[1002];
  })
}
module.exports = Account;