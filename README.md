# Discord.js Boilerplate ESLint 
A simple discord.js bot boilerplate with command Handling

## Bot Installation guide
1. Clone the repository 
2. Open terminal and do `npm install`
3. rename config-sample.json into config.json
4. Add your token into the config.json and add the bot on your server
    - [How to get your token](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
    - [How to add your bot on your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## Eslint setup
Run `npx eslint --init` to setup

In the prompt, select :
- Check syntax, find problems, and enforce code style
- Type of modules : **CommonJS**
- Whick framework : **none of these**
- Typescript : **No**
- Where does your code run : **Node**
- Project style : Popular style guide
- Choose your prefered style
- Format for the config file : **JSON**
- Install dependencies : **Yes**

Now you can verify if the env config containe `"node": true` and you can config your own rules.

Depending on your chisen setup and style guide, you may get syntax error.
- You can find [my config file here](https://gist.github.com/khoeos/860b455ffb84ccf4788f7ac7321d1a00), based on AirBnB Style Guide 


## How to run the app

Simply do `node app.js` or `npm start`

## Usefull links
- [Discord.js Guides](https://discordjs.guide/)
- [Discord.js Docs](https://discord.js.org/#/docs)
- [ESLint Docs](https://eslint.org/)
- [ESLint rules](https://eslint.org/docs/rules/)