const http = require('http');
const koa = require('koa');
const static = require('koa-static');
const etag = require('koa-etag');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('koa-error');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const cors = require('koa2-cors')
const Utils = require('./utils');
const router = require('./router');
const Tips = require('./utils/tip');
const logger = require('./middlewares/logger');
const config = require('./config')
const log = global.console.log.bind(console);
const PORT = process.env.PORT || config.port || 5555;
const app = new koa();
const { responseHandler } = require('./middlewares/response');
const { corsHandler } = require('./middlewares/cors');
const { UserAuth } = require('./middlewares/auth');

app.use(koaBody(
  {
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
    }
  }
));
// 日志中间件
app.use(logger.loggerMiddleware);
// 静态资源文件夹
app.use(static(config.staticPath));

// 用户权限校验
app.use(UserAuth);
// 错误处理
app.use(errorHandler());
app.use(bodyParser());

app.use(etag());

// Cors
app.use(cors(corsHandler))

// compressor
app.use(compress({
  filter: contentType => /text|javascript/i.test(contentType),
  threshold: 2048
}));
router(app);
// Response
app.use(responseHandler)
http.createServer(app.callback()).listen(PORT);


log('server is running on port: %s', PORT);