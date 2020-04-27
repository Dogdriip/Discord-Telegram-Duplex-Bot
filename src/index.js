const dotenv = require('dotenv').config();
process.env.DEBUG = '*';  // for debug logging

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('app');

const discord = require('./discord');
const telegram = require('./telegram');



const app = new Koa();
const router = new Router();


router.use('/discord', discord.routes());
router.use('/telegram', telegram.routes());

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  debug('OK　レディー・ゴー!　＞▽＜');
});


