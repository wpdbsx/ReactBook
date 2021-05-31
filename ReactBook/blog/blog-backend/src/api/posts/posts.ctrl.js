import Post from '../../models/post.js';
import mongoose from 'mongoose';
import Joi from 'joi';
import { parse } from 'dotenv';
const { ObjectId } = mongoose.Types;

/* 포스트 작성
POST /api/posts
{title,body}

*/
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }
  return next();
};
export const write = async (ctx) => {
  //REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
  const schema = Joi.object().keys({
    //객체가 다음필드를 가지고 있음을 검증
    title: Joi.string().required(), //required()가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), //문자열로 이루어진 배열
  });
  //검증하고나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save(); //디비에저장됨
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
포스트 목록 조회
GET /api/posts
*/
export const list = async (ctx) => {
  //query는 문자열이기 때문에 숫자로 변환해 주어야 합니다
  //값이 주어지지 않았다면 기본 1을 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 특정 포스트 조회
GET /api/posts/:id
*/

export const read = async (ctx) => {
  const { id } = ctx.params;
  //주어진 id 값으로 포스트를 찾습니다.
  // 파라미터로 받아온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
  // 비교할 p.id 값을 문자열로 변경해야 합니다.
  try {
    const post = await Post.findById(id).exec();
    //포스트가 없으면 오류를 반환 합니다.
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다.',
      };
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/* 특정 포스트 제거
DELETE /api/posts/:id
*/

export const remove = (ctx) => {
  const { id } = ctx.params;
  //해당 id를 가진 post가 몇 번째인지 확인합니다.
  try {
    Post.findByIdAndRemove(id).exec();
    //포스트가 없으면 오류를 반환합니다.
    ctx.status = 204; //No Content(성공하기는 했지만 응답할 데이터가 없으)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
포스트 수정(교체)
PUT api/posts/:id
{title ,body}
*/
// export const replace = (ctx) => {
//   //PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.
//   const { id } = ctx.params;
//   //해당 id를 가진 post가 몇번째인지 확인합니다.
//   const index = posts.findIndex((p) => p.id.toString() === id);
//   //포스트가 없으면 오류를 반환합니다.
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   //전체 객체를 덮어 씌웁니다.
//   // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   };
//   ctx.body = posts[index];
// };

/* 포스트 수정(특정필드변경)
PATCH /api/posts/:id
{title,body}

*/
export const update = async (ctx) => {
  const schema = Joi.object().keys({
    //객체가 다음필드를 가지고 있음을 검증
    title: Joi.string(), //required()가 있으면 필수 항목
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()), //문자열로 이루어진 배열
  });

  //검증하고나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  //PATCH 메서드는 주어진 필드만 교체합니다.
  const { id } = ctx.params;

  try {
    //해당 id를 가진 post가 몇 번째인지 확인합니다.
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이값을 설정하면 업데이트된 데이터를 반환합니다.
      //false를 하면 업데이트되기이전의 데이터를 반환합니다.
    }).exec();
    //포스트가 없으면 오류를 반환합니다.
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: '포스트가 존재하지 않습니다.',
      };
      return;
    }
    //기존 값에 정보를 덮어 씌웁니다.

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
