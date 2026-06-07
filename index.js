const { Client, Events, GatewayIntentBits } = require("discord.js");

// create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// means when the bot is connected, run this code (the console.log)
// .once means run one time only as the name says lol
// user is what the client is logged in as: in this case, its the bot123129081 (whatev its number is)
client.once(Events.ClientReady, (readyClient) => {
    console.log(`ready! logged in as ${readyClient.user.tag}`);
});

// make sure I loaded variables from .env before starting the bot
if (!process.env.DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is not set');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);