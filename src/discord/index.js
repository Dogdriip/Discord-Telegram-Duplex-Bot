const debug = require("debug")("app:discord");
const Discord = require("discord.js");
const axios = require("axios");
const moment = require("moment");
const moment_timezone = require("moment-timezone");

/// SETUP
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_BOT_CHANNEL_ID;
const client = new Discord.Client();
client.login(TOKEN);

const Router = require("koa-router");
const router = new Router();

/// BOT
client.on("ready", () => {
  debug("＞▽＜");
  client.user.setActivity("＞▽＜");

  // get designated channel
  // const channel = client.channels.cache.get(CHANNEL_ID);
  // channel.send('＞▽＜');
});

client.on("message", async (message) => {
  // filter to designated channel first (CHANNEL empty means it receives from all channel)
  if (message.channel.id != CHANNEL_ID) return;
  // ignore other bots, including itself
  if (message.author.bot) return;

  // testbench!
  if (message.content === "test") {
    message.channel.send("testbench!");
    message.channel.send(message.author.username);
    return;
  }

  // configure res message
  const username = message.author.username;
  // const _date = moment(message.createdAt);
  const _date = moment(message.createdTimestamp);
  // const datetime = `${_date.getFullYear()}/${_date.getMonth()}/${_date.getDate()} ${_date.getHours()}:${_date.getMinutes()}:${_date.getSeconds()}`;
  const datetime = _date.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  const content = message.content;

  // send
  let res = `[${datetime}] ${username} : ${content}`;
  axios
    .post(`http://${process.env.HOST}:${process.env.PORT}/telegram`, {
      content: res,
    })
    .then((response) => {
      debug(response.statusText);
    })
    .catch((error) => {
      debug(error);
    });
});

/// ROUTER
router.post("/", (ctx, next) => {
  const body = ctx.request.body;
  debug(body);
  // TODO: Check whether router gets body correctly, then work on message processing
  const channel = client.channels.cache.get(CHANNEL_ID);
  channel.send(body.content);
  ctx.body = "success";
});

module.exports = router;
