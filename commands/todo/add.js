// const { SlashCommandBuilder } = require("discord.js")

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("add")
//         .setDescription("right now it just adds a user")
//         .addUserOption(option =>
//             option.setName("usr").setDescription("creates a new user object?")
//         ),
//     async execute(interaction) {
//         user = interaction.options.getUser("usr");
//         await interaction.reply("bkha");
//     },
// };