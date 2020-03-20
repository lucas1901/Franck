const Discord = require("discord.js")
const client = new Discord.Client()

let prefix = "t!"

client.login("NjkwNTc4MjQzMDIzMTQyOTUy.XnTiMQ.NK9_m7HmbNUVnxrR5t0wyoYKyqA");
client.on('ready', () => console.log('Coucou je suis démarré !'));
client.on('ready', function(){
    client.user.setActivity('à tous les massacrer !')
})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: bienvenue à toi ' + member.user.username + ' dans le discord du groupe ' + member.guild.name + ' ! Celui-ci a été mis en place pour faciliter la communication entre les joueurs ! Lieu de conseil, de discussion, cest un outil principal à votre progression.')
        
        .setFooter('rejoins nos différents réseaux sociaux - Instragram : https://www.instagram.com/lsop_poker/ - Facebook : https://www.facebook.com/groups/lyonseriesofpoker/ - Twitter : https://twitter.com/_LSOP_')
    member.guild.channels.get('690170257016750084').sendMessage(embed)
});


client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('690170257016750084').sendMessage(embed)
 
});

/*Kick*/
client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.sendMessage("Tu n'as pas la permission :heart:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.sendMessage("Veuillez menttioner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas kick cet utilisateur :x:")
        member.kick()
        message.channel.sendMessage("**"+member.user.username + '** à été exclu !')
    }
})

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.sendMessage("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.sendMessage("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.sendMessage("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});