const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("echos back user input")
        .addStringOption
}