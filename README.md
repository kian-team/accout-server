### 项目启动需要环境 node koa mysql redis

## 运行命令

```bash

//本地测试运行dev
# yarn dev

//使用PM2运行
# yarn star

//停止PM2运行

# yarn stop 

```

### 目录结构

```bash
.
|-- config //系统配置文件
|   |-- index.js
|   |-- pri.pem
|   `-- pub.pem
|-- controllers //存放路由逻辑部分
|   |-- account.js
|   |-- common.js
|   `-- user.js
|-- db //数据库文件
|   |-- index.js
|   |-- mysql.js
|   `-- redis.js
|-- index.js //系统入口文件
|-- init  //数据库初始化文件
|   `-- dbInit.js
|-- logs //日志文件目录
|   |-- app-err.log
|   |-- app-out.log
|   |-- koa-template.log
|  
|-- middlewares //中间件
|   |-- auth.js //权鉴
|   |-- cors.js //跨域
|   |-- logger.js //日志配置
|   `-- response.js //相应信息
|-- modules
|-- package.json
|-- pm2.config.js // pm2配置文件
|-- router //路由文件
|   |-- account.js
|   |-- common.js
|   |-- index.js
|   `-- user.js
|-- schema
|   `-- table.js
|-- sql //数据库表
|   |-- data.sql
|   `-- user.sql
|-- static //静态资源文件
|   |-- css
|   |-- files
|   |-- img
|   `-- js
|-- test
|   `-- test.js
|-- utils //工具函数
|   |-- get-sql-content-map.js
|   |-- get-sql-map.js
|   |-- index.js
|   |-- tip.js
|   `-- walk-file.js
`-- yarn.lock


```
