const debug = require('debug')('app:telegram');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

/// SETUP
const GROUP = process.env.TELEGRAM_BOT_GROUP_ID;
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const Router = require('koa-router');
const router = new Router();

/// BOT
bot.onText(/\/test (.+)/, (msg, match) => {
  // testbench!
  if (msg.chat.id != GROUP) return;

  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});


bot.on('message', (msg) => {
  if (msg.chat.id != GROUP) return;

  const message_id = msg.message_id;
  const _from = msg.from;  // Class User
  const first_name = _from.first_name;
  const _date = msg.date;
  const date_str = new Date(_date * 1000).toLocaleTimeString("en-US");
  const text = msg.text;

  let res = `[${date_str}] ${first_name} : ${text}`;
  debug(res);
  axios.post(`http://${process.env.HOST}:${process.env.PORT}/discord`, {
    content: res,
  })
    .then((response) => {
      debug(response.statusText);
    })
    .catch((error) => {
      debug(error);
    });

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, `${first_name} [${date_str}] : ${text}`);
});


/// ROUTER
router.post('/', (ctx, next) => {
  const body = ctx.request.body;
  debug(body);
  bot.sendMessage(GROUP, body.content);
  ctx.body = 'success';
});

module.exports = router;