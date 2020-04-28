const user = require('./user');
const account = require('./account');
module.exports = function (app) {
  app.use(user.routes()).use(user.allowedMethods());
  app.use(account.routes()).use(account.allowedMethods());
}