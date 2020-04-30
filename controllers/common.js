const fs = require('fs');
const { FilePath } = require('../config')
const Tips = require('../utils/tip');
const uploadUrl = "http://localhost:5555/files";
const Common  = {};
  Common.upload = async (ctx, next) => {
  const file = ctx.request.files.file;	// 获取上传文件

  if(file.name ==''){
    ctx.body ={
     ...Tips[1003] 
    }
    return await next();
  }
  // 读取文件流
  const fileReader = fs.createReadStream(file.path);

  const filePath = FilePath;
  // 组装成绝对路径
  const fileResource = filePath + `\\${file.name}`;

  /*
   使用 createWriteStream 写入数据，然后使用管道流pipe拼接
  */
  const writeStream = fs.createWriteStream(fileResource);
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fileReader.pipe(writeStream);
        ctx.body = {
          url: uploadUrl + `/${file.name}`,
          ...Tips[0]
        };
      }
    });
  } else {
    fileReader.pipe(writeStream);
    ctx.body = {
      url: uploadUrl + `/${file.name}`,
      ...Tips[0]
    };
  }
}

module.exports = Common;
