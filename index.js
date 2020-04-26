const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
require('dotenv').config();

let tamagchis = [];

async function dmUser(id){
    console.log((await client.users.fetch(id)));
    return (await client.users.fetch(id));
}



class Tamagachi{
    constructor(object){
        this.id = object.id;
        this.health = object.health;
        this.food = object.food;
        this.happiness = object.happiness;
        this.energy = object.energy;
        this.score = object.score;
    }

    balance(){
        if(this.food > 100){
            this.food = 100;
        }
        if(this.health > 100){
            this.health = 100;
        }
        if(this.energy > 100){
            this.energy = 100;
        }
        if(this.happiness > 100){
            this.happiness = 100;
        }
        if(this.health <= 0){
            this.died();
        }
        if(this.food  <= 0|| this.energy <= 0 || this.happiness <= 0){
            this.health -= 20;
        }
    }

    play(){
        this.energy -= 10;
        this.food -= 2;
        this.happiness += 40;
        this.balance();
        return "you played with ur tamagachi";
    }

    feed(){
        this.food = 100;
        this.balance();
        return "you tamagachi has been fed";
    }
    sleep(){
        this.energy = 100;
        this.happiness += 5;
        this.balance();
        return "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    }

    died(){
        dmUser(this.id).then(user =>{
            user.send(`ur tamagachi died your score is ${this.score}. To start with a new tamagachi use the !start command again`);
        });
        tamagchis.splice(tamagchis.indexOf(this),1);
        return "ur tamagachi died"
    }
    update(){
        this.food -= 10;
        this.energy -= 5;
        this.happiness -= 1;
        this.score++;
        if(1442 == Math.round(Math.random() * 1892)){
            dmUser(this.id).then(user =>{
                user.send('```ur tamagachi died of an anurism :( ```');
                this.died();
            }); 
        }
        else{
            this.balance();
        }
    }

}

function update(){
    tamagchis.forEach(a =>{
        a.update();
    });
    fs.writeFileSync('tamagachis.json',JSON.stringify(tamagchis));
    console.log('update!');
    return 0;
}

client.on('ready', ()=>{
    if(fs.existsSync('tamagachis.json')){
        tamagchis = JSON.parse(fs.readFileSync('tamagachis.json'));
        tamagchis.forEach( a =>{
            console.log(a);
            tamagchis.push(new Tamagachi(a));
            tamagchis.splice(tamagchis.indexOf(a),1);
            console.log(a);
        });
    }
    console.log(tamagchis);
    console.log(`logged in as ${client.user.tag}!`);
    client.user.setActivity("!help");
    setInterval(update, /*1800000*/1000);




});

function findTamagachi(id){
    let ree = null;
    tamagchis.forEach(a =>{
        if(id == a.id){
            console.log('found tamagachi');
            ree = a;
        }
    });
    return ree;
}

client.on('message', async msg =>{
    if(msg.content.startsWith('!')){
        let content = msg.content.substr(1,msg.content.length);
        if(content.startsWith('start') && findTamagachi(msg.author.id) == null){
            let bruh = {
                id : msg.author.id,
                health : 100,
                food : 100,
                energy : 100,
                happiness : 100,
                score : 0,
            }
            tamagchis.push(new Tamagachi(bruh));
            console.log('made new tamagachi');
            msg.channel.send("WELCOME TO TAMAGACHI BOT, U NOW HAVE UR OWN TAMAGACHI TO TAKE CARE OF. USE !help TO FIND OUT ABOUT OTHER COMMANDS");
        }
        if(findTamagachi(msg.author.id) != null){
            console.log('test?');
            let tam = findTamagachi(msg.author.id);
            console.log(tam);
            console.log('test?');
            if(content.startsWith('display')){
                console.log('its not wanting to work');
                msg.channel.send(new discord.MessageEmbed()
                    .setColor('#00ffd5')
                    .setTitle('Tamagachi Bot')
                    .setThumbnail(client.user.avatarURL())
                    .setAuthor('@TamagachiBot', client.user.avatarURL(), 'https://github.com/steve1442/tamagachibot')
                    .addFields(
                        {
                            name: `Health`,
                            value: `${tam.health}`,
                            inline: false
                        },
                        {
                            name: `Food`,
                            value: `${tam.food}`,
                            inline: false
                        },
                        {
                            name: `Energy`,
                            value: `${tam.energy}`,
                            inline: false
                        },
                        {
                            name: `Happiness`,
                            value: `${tam.happiness}`,
                            inline: false
                        },
                    )
                );
            }
            else if(content.startsWith('feed')){
                msg.channel.send(tam.feed());
            }
            else if(content.startsWith('sleep')){
                msg.channel.send(tam.sleep());
            }
            else if(content.startsWith('play')){
                msg.channel.send(tam.play());
            }
        }
        if(content.startsWith('help')){
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