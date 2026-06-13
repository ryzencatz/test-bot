const { SlashCommandBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("creates smth duh")
        .addSubcommand(subcommand => // create a new list       opts: cat, user, list-name ----done----
            subcommand
            .setName("list") 
            .setDescription("creates a new list")
            .addUserOption(option =>
                option
                .setName("user")
                .setDescription("the user that the list is for")
                .setRequired(true)
            )
            .addStringOption(option => 
                option
                .setName("list-name")
                .setDescription("the name of todo")
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName("cat")
                .setDescription("the category that the list is in")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>  // create a new li         opts: user, cat, list-name, content ----DONE----
            subcommand
            .setName("li")
            .setDescription("creates a new list item")
            .addUserOption(option =>
                option
                .setName("user")
                .setDescription("the user that will have the list")
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName("cat")
                .setDescription("the category that the list is in")
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName("list-name")
                .setDescription("the name of todo")
                .setRequired(true)
            )
            .addStringOption(option => 
                option
                .setName("li-content")
                .setDescription("the content of the list item")
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        const dataPath = path.join(__dirname, '..', '..', 'todo-data', 'data.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === "list") {
            const userId = interaction.options.getUser("user").id;
            const listName = interaction.options.getString("list-name");
            const cat = interaction.options.getString("cat");

            if (!(userId in data)) { data[userId] = {}; }
            if (!(cat in data[userId])) { data[userId][cat] = {}; }
            if (listName in data[userId][cat]) {
                await interaction.reply("That list already exists.");
                return;
            } else { data[userId][cat][listName] = []; }

            await interaction.reply(`created list "${listName}" in category "${cat}" for user "${interaction.options.getUser("user").username}"!`);
        } else if (subcommand === "li") {
            const userId = interaction.options.getUser("user").id;
            const listName = interaction.options.getString("list-name");
            const cat = interaction.options.getString("cat");
            const content = interaction.options.getString("li-content");

            if (!data[userId]?.[cat]?.[listName]) {
                await interaction.reply("That list does not exist.");
                return;
            } else { data[userId][cat][listName].push({content, completed: false}); }

            await interaction.reply(`created list item in "${listName}" in category "${cat}" for user "${interaction.options.getUser("user").username}" with content "${content}"!`);
        }

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
    }
};


// {
//     "123131323123": {
//         "comp math": {
//             "1": []
//         }
//     }
// }


// so the data has the form :

// {
//     "123123423412": {
//         "comp math": {
//             "1": [
//                 {"content": "finish hw", "completed": false},
//                 {"content": "create explainer video", "completed": true},
//                 {"content": "read solution", "completed": false}
//             ],
//             "2": [
//                 {"content": "watch lecture", "completed": false},
//                 {"content": "groupsolve session", "completed": true},
//                 {"content": "review comp", "completed": false}
//             ]
//         } 
//     }
// }