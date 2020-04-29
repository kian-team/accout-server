const fs = require('fs');
const { FilePath } = require('../config')
const Common  = {};
  Common.upload = async (ctx) => {
  const file = ctx.request.files.file;	// 获取上传文件
  const reader = await fs.createReadStream(FilePath);	// 创建可读流
  const ext = file.name.split('.').pop();		// 获取上传文件扩展名
  const upStream = await fs.createWriteStream(`${FilePath}\\${Math.random().toString()}.${ext}`);		// 创建可写流
  await reader.pipe(upStream);	// 可读流通过管道写入可写流
  return ctx.body = '上传成功';
}

module.exports = Common;
