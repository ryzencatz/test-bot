const { SlashCommandBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("creates smth duh")
        .addSubcommand()  // create a new category   opts: user
            .setName("cat")
            .setDescription("create a new category")
            .addUserOption()
                .setName("user")
                .setDescription("the user the cat is for")
                .setRequired(true)
        .addSubcommand()  // create a new list       opts: cat, user, week
            .setName("list")
            .setDescription("creates a new list")
            .addUserOption()
                .setName("user")
                .setDescription("the user that the list is for")
                .setRequired(true)
            .addStringOption()
                .setName("week")
                .setDescription("the week that the todo list is for")
                .setRequired(true)
        .addSubcommand()  // create a new li         opts: user, cat, week, content ----DONE----
            .setName("li")
            .setDescription("creates a new list item")
            .addStringOption()
                .setName("user")
                .setDescription("the user that will have the list")
                .setRequired(true)
            .addStringOption()
                .setName("cat")
                .setDescription("the category that the list is in")
                .setRequired(true)
            .addStringOption()
                .setName("week")
                .setDescription("the week that the todo list is in")
                .setRequired(true)
            .addStringOption()
                .setName("content")
                .setDescription("the content of the list item")
                .setRequired(true)
        .addSubcommand() // mark a li as complete   opts: user, list-name, li (the index)
            .setName("complete")
            .setDescription("marks a li as complete"),
    execute(interaction) {
        const dataPath = path.join(__dirname, 'todo=data', 'data.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        
    }
};




// so the data has the form :

// {
//     userid1: {
//         cat1: [
//             {
//                 name:"list name",
//                 items: [{content: "li1 content", completed: true}]
//             }
//         ]
//     }
//     userid2: {
//         cat1: [
//             {
//                 name:"list name",
//                 items: [{content: "li1 content", completed: true}]
//             }
//         ]
//     }
// }