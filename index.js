const discord = require('discord.js');
const client = new discord.Client();
require('dotenv').config();

class Tamagachi{
    constructor(id){
        this.id = id;
        this.health = 100;
        this.food = 100;
        this.happiness = 100;
        this.energy = 100;
        this.score = 0;
    }

    play(){
        this.energy -= 10;
        this.food -= 2;
        this.happiness += 40;
        return "you played with ur tamagachi";
    }

    feed(){
        this.food = 100;
        return "you tamagachi has been fed";
    }
    sleep(){
        this.energy = 100;
        this.happiness += 5;
        return "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    }

    died(){

    }

    update(){
        this.food -= 10;
        this.energy -= 5;
        this.happiness -= 1;
        this.score++;
    }

}

let test;
test = new Tamagachi('yeet');
client.on('ready', ()=>{
    console.log(`logged in as ${client.user.tag}!`);
    client.user.setActivity("!help");
});


client.on('message', msg =>{
    if(msg.content.startsWith('!')){
        let content = msg.content.substr(1,msg.content.length);
        if(content.startsWith('display')){
            msg.channel.send(new discord.MessageEmbed()
                .setColor('#00ffd5')
                .setTitle('Tamagachi Bot')
                .setThumbnail(client.user.avatarURL())
                .setAuthor('@TamagachiBot', client.user.avatarURL(), 'https://github.com/steve1442/tamagachibot')
                .addFields(
                    {
                        name: `Health`,
                        value: `${test.health}`,
                        inline: false
                    },
                    {
                        name: `Food`,
                        value: `${test.food}`,
                        inline: false
                    },
                    {
                        name: `Energy`,
                        value: `${test.energy}`,
                        inline: false
                    },
                    {
                        name: `Happiness`,
                        value: `${test.happiness}`,
                        inline: false
                    },
	            )
	        );
        }
        else if(content.startsWith('feed')){
            msg.channel.send(test.feed());
        }
        else if(content.startsWith('sleep')){
            msg.channel.send(test.sleep());
        }
        else if(content.startsWith('play')){
            msg.channel.send(test.play());
        }
        else if(content.startsWith('help')){
            msg.channel.send(new discord.MessageEmbed()
                .setColor('#00ffd5')
                .setTitle('Tamagachi Bot Help')
                .setThumbnail(client.user.avatarURL())
                .setAuthor('@TamagachiBot', client.user.avatarURL(), 'https://github.com/steve1442/tamagachibot')
                .addFields(
                    {
                        name: `!feed`,
                        value: `feeds your tamagachi`,
                        inline: false
                    },
                    {
                        name: `!sleep`,
                        value: `puts your tamagachi to sleep (i hope they wake up asshole)`,
                        inline: false
                    },
                    {
                        name: `!play`,
                        value: `play with ur child asshole`,
                        inline: false
                    },
                    {
                        name: `!display`,
                        value: `shows ur tamagachis stats`,
                        inline: false
                    },
	            )
	        );
        }

    }
});











client.login(process.env.BOT_TOKEN);