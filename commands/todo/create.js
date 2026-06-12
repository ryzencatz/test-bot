const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tod")
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
        .addSubcommand()  // create a new li         opts: user, list-name, content
        .addSubcommand(), // mark a li as complete   opts: user, list-name, li (the index)
    execute(interaction) {

    }
};




// so the data has the form :

// {
//     user1: {
//         cat1: [
//             {
//                 name:"list name",
//                 items: [{content: "li1 content", completed: true}]
//             }
//         ]
//     }
//     user2: {
//         cat1: [
//             {
//                 name:"list name",
//                 items: [{content: "li1 content", completed: true}]
//             }
//         ]
//     }
// }