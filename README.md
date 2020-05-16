# Discord-Telegram-Duplex-Bot
Duplex system for simple text message between Telegram and Discord

![screenshot](screenshot.png)

＞▽＜

## How to use
1. 
    Install dependencies
    ```
    $ npm install
    ```
2.
    Configure environment variables
    ``` shell script
    $ cat .env
    ## For debug logging. To see all debug logs, DEBUG = '*'
    DEBUG = 'app*'
   
    ## Do not edit HOST 
    HOST = 'localhost'
    PORT = 4000
   
    ## Configure two bots first.
    ## You need to get Telegram group id and Discord channel id manually.
    #### Telegram bot's privacy setting should be disabled. (See BotFather /setprivacy)
    #### Discord bot should have appropriate permissions.  
    TELEGRAM_BOT_TOKEN = '<TELEGRAM BOT TOKEN HERE>'
    TELEGRAM_BOT_GROUP_ID = '<TELEGRAM GROUP ID HERE>'
    DISCORD_BOT_TOKEN = '<DISCORD BOT TOKEN HERE>'
    DISCORD_BOT_CHANNEL_ID = '<DISCORD CHANNEL ID HERE>'
    ```

3.
    Run!
    ```
    $ npm start 
    ``` 
    For nodemon, try this:
    ```
    $ npm run start:dev
    ``` 

## TODO
- [x] Write TODO
- [x] Fix timezone issue 
- [x] Handle reply in Telegram
- [ ] Support stickers
- [ ] Support photos
- [ ] Fix API structure
- [ ] More stable deployments
