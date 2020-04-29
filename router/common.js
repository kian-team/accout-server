const router = require('koa-router')();
const Common = require('../controllers/common');

// 文件上传
router.post('/upload', Common.upload);

module.exports = router;