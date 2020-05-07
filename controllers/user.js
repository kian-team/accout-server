const Utils = require('../utils');
const Tips = require('../utils/tip');
const md5 = require('md5');
const db = require('../db');
// const redis = require('../db/redis');
const UUID = require('uuid');

const Login = {};

// 注册
Login.register = async (ctx, next) => {
  let data = Utils.filter(ctx.request.body, ['name', 'password', 'nick_name']);
  let res = Utils.formatData(data, [
    { key: 'name', type: 'string' },
    { key: 'password', type: 'string' },
    { key: 'nick_name', type: 'string' },
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { name, password, nick_name } = data;
  let uid = UUID.v1();
  let u_delete = 0;
  let u_date = new Date();
  let sql = ' INSERT INTO  t_user (u_id, u_account, u_name, u_password,u_nickname, u_delete, u_date ) VALUES (?,?,?,?,?,?,?)', value = [uid, name,name, md5(password), nick_name, u_delete, u_date];
  await db.query(sql, value).then(res => {
    if (res.affectedRows == 1) {
      ctx.body = {
        ...Tips[0], data: { name, nick_name, u_date }
      }
    }
  }).catch(e => {
    if (e.code == 'ER_DUP_ENTRY') {
      ctx.body = Tips[1004];
    } else {
      ctx.body = Tips[1002];

    }
  });
}
//登录
Login.login = async (ctx, next) => {
  let data = Utils.filter(ctx.request.body, ['name', 'password']);
  let res = Utils.formatData(data, [
    { key: 'name', type: 'string' },
    { key: 'password', type: 'string' }
  ]);
  if (!res) return ctx.body = Tips[1007];
  let { name, password } = data;
  let sql = 'SELECT u_id FROM t_user WHERE u_name=? and u_password=? and u_delete=0', value = [name, md5(password)];
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      let val = res[0];
      let uid = val['u_id'];
      let token = Utils.generateToken({ uid });
      // redis.setKey(uid, token);//redis设置
      // redis.setExpire(uid, 60 * 60 * 24);
      ctx.body = {
        ...Tips[0], data: { token }
      }


    } else {
      ctx.body = Tips[1006];
    }
  }).catch(e => {
    ctx.body = Tips[1002];
  });

}

//查询登录信息

Login.auth = async (ctx, next) => {

  let { uid } = ctx.state || {};
  if (uid) {
    ctx.body = { ...Tips[0] };
  } else {
    ctx.body = Tips[1005];
  }
  // let sql = 'SELECT name,uid,nick_name FROM t_user WHERE uid=? AND is_delete=0', value = [uid];
  // await db.query(sql, value).then(res => {
  //   if (res && res.length > 0) {
  //     ctx.body = { ...Tips[0], data: res[0] };
  //   } else {
  //     ctx.body = Tips[1005];
  //   }
  // }).catch(e => {
  //   ctx.body = Tips[1005];
  // })
}
//退出登录

Login.quit = async (ctx, next) => {
  ctx.state = null;
  ctx.body = Tips['0']

}
module.exports = Login;