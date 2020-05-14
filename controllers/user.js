const Utils = require('../utils');
const Tips = require('../utils/tip');
const md5 = require('md5');
const db = require('../db');
// const redis = require('../db/redis');
const UUID = require('uuid');
const axios = require('axios');

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
  let sql = ' INSERT INTO  t_user (u_id, u_account, u_name, u_password,u_nickname, u_delete, u_date ) VALUES (?,?,?,?,?,?,?)', value = [uid, name, name, md5(password), nick_name, u_delete, u_date];
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
}
//退出登录

Login.quit = async (ctx, next) => {
  ctx.state = null;
  ctx.body = Tips['0']

}
const config = {
  client_id: 'XXXXXX',    //github生成的ID及密码
  client_secret: 'XXXXXX'
};
let redirectPath = 'http://localhost:8080/'

Login.GitHubLogin = async (ctx, next) => {
  if (ctx.query.path) redirectPath = ctx.query.path
  var dataStr = (new Date()).valueOf();
  //重定向到认证接口,并配置参数
  var path = "https://github.com/login/oauth/authorize";
  path += '?client_id=' + config.client_id;
  //将地址及参数返回前端
  ctx.body = {
    ...Tips[0],
    path
  };
}
Login.GitHubCallBack = async (ctx, next) => {
  console.log('callback...')
  const code = ctx.query.code;    //返回的授权码
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code
  }
  //使用这个授权码，向 GitHub 请求令牌
  let res = await axios.post('https://github.com/login/oauth/access_token', params)
  const args = res.data.split('&');
  let arg = args[0].split('=');
  const access_token = arg[1];
  //再通过令牌获取用户信息
  let result = await axios.get('https://api.github.com/user?access_token=' + access_token).then(res => {
    console.log(res);

    return res.data;
  }).catch(err => {
    console.log(err);
    ctx.body = Tips[1005]
  })
  // console.log('userAccess:', res.data)
  // ctx.body = res.data
  console.log(result);
  ctx.body = {
    ...Tips[0],
    result
  }
  ctx.cookies.set('user', result.login)  //用户名称
  ctx.cookies.set('icon', result.avatar_url)  //用户图片
  ctx.cookies.set('token', result.node_id)  //用户图片
  ctx.redirect(redirectPath)  //重定向到请求页面
}
module.exports = Login;