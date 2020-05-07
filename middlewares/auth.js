const Utils = require('../utils');
const Tips = require('../utils/tip');
const UserAuth = async (ctx, next) => {
  let { url = '' } = ctx;
  if (url.indexOf('/oa/user/') > -1 || url.indexOf('/oa/account/') > -1) {//需要校验登录态
    let header = ctx.request.header;
    let { authorization } = header;

    if (authorization) {
      let result = Utils.verifyToken(authorization);
      let { uid } = result;
      if (uid) {
        ctx.state = { uid, authorization };
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

module.exports = {
  UserAuth
}