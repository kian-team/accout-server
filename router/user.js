const router = require('koa-router')();
const Login = require('../controllers/user');

// 注册
router.post('/oa/adduser', Login.register);
//登录
router.post('/oa/login', Login.login);

//查询登录信息
router.get('/oa/user/auth', Login.auth);
//退出登录
router.post('/oa/quit', Login.quit);


router.get('/github/login',Login.GitHubLogin);
//认证后的github回调
router.get('/github/oauth/callback',Login.GitHubCallBack)

module.exports = router;