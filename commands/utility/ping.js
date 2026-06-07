const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("replies with pong! ping pong ping pong lol"),
    async execute(interaction) {
        await interaction.reply("pong!");
    },
}