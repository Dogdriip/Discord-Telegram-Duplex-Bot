const dotenv = require('dotenv');
dotenv.config();
// to configure debug logging, see process.env.DEBUG
// *, or app*, etc...

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('app');
const moment = require('moment');
const moment_timezone = require('moment-timezone');

const discord = require('./discord');
const telegram = require('./telegram');

const app = new Koa();
const router = new Router();

router.use('/discord', discord.routes());
router.use('/telegram', telegram.routes());

app
  .use(bodyParser())  // bodyParser before router settings
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  debug('OK　レディー・ゴー!　＞▽＜');
  debug(moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'));
});
