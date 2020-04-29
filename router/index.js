const user = require('./user');
const account = require('./account');
const common = require('./common');
module.exports = function (app) {
  app.use(common.routes()).use(common.allowedMethods());
  app.use(user.routes()).use(user.allowedMethods());
  app.use(account.routes()).use(account.allowedMethods());
}