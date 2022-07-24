//Main vars
const discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const app = express();
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ],
  allowedMentions: ["users"],
});
let prefix = ".";

app.listen(3000, () => {
  console.log(`Bot starting...`);
});

app.get("/", async (req, res) => {
  res.send("Hello Jimmy!");
});

//Command handler
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    //   const command = client.commands.get(commandName)
    const command =
      client.commands.get(cmd) ||
      client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
    if (!command) return;
    command.run(client, message, args);
  }
});

//Bot sends message in channel every hour
setInterval(() => {
  client.channels
    .get("995118218651897908g")
    .send(
      "Did you know that Jimmy clan has a website? if not check it out (Here!)[https://jimmyclan.tk]"
    );
}, 3600000);

//dev stuff
client.on("message", (message) => {
  if (message.content === "<@735641273477890178>") {
    message.channel.send("imagine pinging my developer. smh");
  }
});
// on ready
client.on("ready", () => {
  console.log(`Bot is in ${client.guilds.cache.size} servers!`);
});

client.on("ready", () => {
  client.user.setActivity(`${client.guilds.cache.size} Servers`, {
    type: "WATCHING",
  });
});
// error handling
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:\n", err);
});
process.on("unhandledException", (err) => {
  console.error("Unhandled Promise Exception:\n", err);
});
process.on("unhandledExceptionMonitor", (err) => {
  console.error("Unhandled Promise Exception (Monitor):\n", err);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.error("Multiple Resolves:\n", type, promise, reason);
});

//login to bot
client
  .login(process.env.token)
  .then((r) => console.log(`Successfully logged in as ${client.user.tag}!`))
  .catch((e) => console.log(e));
