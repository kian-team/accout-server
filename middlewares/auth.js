const Utils = require('../utils');

const UserAuth = async (ctx, next) => {
  let { url = '' } = ctx;
  if (url.indexOf('/oa/user/') > -1) {//需要校验登录态
    let header = ctx.request.header;
    let { loginedtoken } = header;

    if (loginedtoken) {
      let result = Utils.verifyToken(loginedtoken);
      let { uid } = result;
      if (uid) {
        ctx.state = { uid, loginedtoken };
        await next();
      } else {
        return ctx.body = Tips[1005];
      }
    } else {
      return ctx.body = Tips[1005];
    }
  } else {
    await next();
  }

}

module.exports= {
  UserAuth
}