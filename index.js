// imports
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require("discord.js");

// create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// means when the bot is connected, run this code (the console.log)
// .once means run one time only as the name says lol
// user is what the client is logged in as: in this case, its the bot[12...] 
client.once(Events.ClientReady, (readyClient) => {
    console.log(`ready! logged in as ${readyClient.user.tag}`);
});

// make sure I loaded variables from .env before starting the bot
if (!process.env.DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is not set');
  process.exit(1);
}

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); // foldersPath = ./commands 
const commandFolders = fs.readdirSync(foldersPath); // stores the folders in ./commands in a const called commandFolders

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder); // comandsPath = foldersPath/folder = ./command/[each folder]
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js')); // stores the .js files from folder in commandFiles
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file); // 
        const command = require(filePath); // basically imports filePath
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}