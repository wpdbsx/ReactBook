import Router from 'koa-router';
import posts from './posts/index.js';
const api = new Router();

// api.get('/test', (ctx) => {
//   ctx.body = 'test 성공';
// });
api.use('/posts', posts.routes());
//라우터를 내보냅니다.

export default api;
