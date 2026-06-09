// ignore the amount of comments here; we all have different coping mechanisms

const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require("discord.js");

// create a new Client object aka the bot's connection to discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// making sure u ran the `--env-file=.env` part.
if (!process.env.DISCORD_TOKEN) {
  console.error('\nWARNING WARNING YOU\'RE GETTING HACKED\n\nno actually your token is not set\n');
  process.exit(1);
}

// assigns a Collection object to the commands property in client
client.commands = new Collection();

// load command files in a much more compact way compared to just "require"-ing them manually (apparently it's called dynamic command loading)
const foldersPath = path.join(__dirname, 'commands'); // [absolute path to project]/commands. let's just call [absolute path to project] as ninja-cat
const commandFolders = fs.readdirSync(foldersPath); // stores the folders in ninja-cat/commands in an array called commandFolders

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder); // foldersPath/folder = ninja-cat/command/utlity for example
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js')); // stores the .js files from folder in array commandFiles
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file); // ninja-cat/command/utility/ping.js
        const command = require(filePath); // imports ninja-cat/command/utilify/ping.js 
        if ('data' in command && 'execute' in command) { // make sure each command file has data and execute 
            client.commands.set(command.data.name, command); // in the commands Collection object, set the name of the command as the key and the value as the "import" of the command file. 
        } else {
            console.log(`[WARNING] command at ${filePath} is missing a required "data" or "execute" property. go fix it. unless you intentionally don't want to.`);
        }
    }
}

// run when bot is ready 
client.once(Events.ClientReady, (readyClient) => {
    console.log(`ready! logged in as ${readyClient.user.tag}`);
});

// log in!
client.login(process.env.DISCORD_TOKEN);