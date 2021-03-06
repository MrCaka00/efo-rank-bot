const db = require('quick.db')

const { getInfo } = require("../handlers/xp.js")

const canvacord = require("canvacord");

const Discord = require("discord.js");

/*

module.exports = {

  name: "level",

  aliases: ["lvl", "rank"],

  description: "Get the level of Author or Mentioned",

  usage: "level [user]",

  category: "info",*/

  exports.run = async(client, message, args) => {

    const user = message.mentions.users.first() || message.author;

    

    if(user.id === client.user.id) { //IF BOT

      return message.channel.send("Ben OPum Ve 100 Seviyeyim 🖖💪")

    }

    

    if(user.bot) {

      return message.channel.send("Botların Leveli Bulunmamakta!")

    }

    

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;

    

    const {level, remxp, levelxp} = getInfo(xp);

    

const rank = new canvacord.Rank()

    .setAvatar(user.displayAvatarURL({dynamic: false,  format: 'jpg'}))

    .setCurrentXP(remxp)

    .setRequiredXP(levelxp)

    .setLevel(level)

    .setStatus(user.presence.status)

    .setProgressBar("GOLD", "COLOR")

    .setUsername(user.username)

    .setDiscriminator(user.discriminator)

    .setRank(1, "a", false)

    .setBackground("IMAGE", "https://cubemcpe.net/efo-rank-bot.jpg");

rank.build()

    .then(data => {

        const attachment = new Discord.MessageAttachment(data, "eforankbot.jpg");

        message.channel.send(attachment);

    });   

    

    

    

    

  

}

  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["level"],
  permLevel: 0
};
  
exports.help = {

  name: 'rank',

  description: '',

  usage: '',

  };