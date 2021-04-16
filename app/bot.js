const Discord = require("discord.js");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const client = new Discord.Client();
require("./inlinereply.js")
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const db = require("quick.db");
require("./util/eventLoader")(client);
require("./util/eventHandler.js")
var prefix = ayarlar.prefix;
var token = ayarlar.token;
const express = require("express");
const app = express();
const http = require("http");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
  
  app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 120000);

client.login(process.env.token);

client.on("guildMemberAdd", async member => {
    var engin = await db.fetch(`hgmesaj_${member.guild.id}`)
    if(!engin) return;
    const embed = new Discord.MessageEmbed()
    .setTitle('Hoşgeldin!')
    .setDescription(`<a:giriscikis:821785793194229760> <@${member.id}> Sunucumuza hoşgeldin!`)
    .setColor('GREEN')
    client.channels.cache.get(engin).send(embed);
  })
 
client.on("guildMemberAdd", async member => {
let hedef = "250";
member.guild.channels.cache.get("819984575756632114").send(`<a:giriscikis:821785793194229760> <@${member.id}> **Hoşgeldin!** \n<a:nrp:820552673627209750> Seninle birlikte \`${member.guild.memberCount}\` kişi olduk. \n<a:rainbow_koyunlar:820552690580717568> Hedef üye sayısına ulaşmamıza **${hedef - member.guild.memberCount}** kişi kaldı!`)
})
client.on("guildMemberRemove", async member => {
let hedef = "250";
member.guild.channels.cache.get("819984575756632114").send(`<a:cikisgiris:821785807664054272> ${member.user.username} **Sunucudan ayrıldı!** \n<a:nrp:820552673627209750> Ayrılınca \`${member.guild.memberCount}\` kişi kaldık. \n<a:rainbow_koyunlar:820552690580717568> Hedef üye sayısına ulaşmamıza **${hedef - member.guild.memberCount}** kişi kaldı!`)
})

client.on("guildMemberRemove", async member => {
    var engin = await db.fetch(`bbmesaj_${member.guild.id}`)
    if(!engin) return;
    const embed = new Discord.MessageEmbed()
    .setTitle('Görüşürüz!')
    .setDescription(`<a:cikisgiris:821785807664054272> <@${member.id}> Sunucumuzdan çıkış yaptı!`)
    .setColor('RED')
    client.channels.cache.get(engin).send(embed);
  })

const { addexp } = require("./handlers/xp.js")

//LEVEL

client.on("message", async message => {

if(message.author.bot) return;

  if(!message.guild) return;

  

return addexp(message)

})


client.on('message', (msg) => {
  if(msg.channel.id !== '820232066745761793') return
  msg.react('<a:tik:830321119184551946>')
  msg.react('<a:yanlis:830321158955073566>')
})