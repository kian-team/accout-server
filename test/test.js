const uuid = require('uuid');
const redis = require('../db/redis');

console.log(uuid.v1());

let a = (async () => {
 return await redis.getKey('hello');
})
a().then(res =>{
  console.log(res)
  debugger;
}).catch(e =>{
  console.log(e);
});