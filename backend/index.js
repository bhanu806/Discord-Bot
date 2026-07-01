const {Client,GatewayIntentBits}=require("discord.js");
require("dotenv").config();
const token=process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const jwttoken=process.env.JWT_TOKEN;
const client=new Client({
    intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]
})
client.on('messageCreate',async (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith("create")){
       const url = message.content.split("create")[1].trim();
        const res=await fetch("http://localhost:8001/url",{
            method:"POST",
            headers:{
                 "Content-Type": "application/json",
                  "authorization": jwttoken,
            },
            body:JSON.stringify({
                url: url,
            }),
        })
        const data = await res.json();
        return message.reply("short Id is " + data.newURL)
    }
    message.reply({
        content:"hello from bot"
    })
    console.log(message.content);
})
client.on('interactionCreate',(interaction)=>{
    interaction.reply("Pong!")
    
})
client.login(token);