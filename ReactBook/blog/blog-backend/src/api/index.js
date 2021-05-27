const Router = require('koa-router');
const api = new Router();

const posts = require('./posts');
api.get('/test', (ctx) => {
  ctx.body = 'test 성공';
});

//라우터를 내보냅니다.
api.use('/posts', posts.routes());
module.exports = api;
