const { SlashCommandBuilder } = require("discord.js");

const {
    loadData,
    saveData,
} = require("../../todo-data/storage");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createlist")
        .setDescription("create a todo list")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("user")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("cat")
                .setDescription("category")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("list-name")
                .setDescription("list name")
                .setRequired(true)
        ),

    async execute(interaction) {
        const data = loadData();

        const userId =
            interaction.options.getUser("user").id;

        const cat =
            interaction.options.getString("cat");

        const listName =
            interaction.options.getString("list-name");

        data[userId] ??= {};
        data[userId][cat] ??= {};

        if (data[userId][cat][listName]) {
            await interaction.reply(
                "That list already exists."
            );
            return;
        }

        data[userId][cat][listName] = [];

        saveData(data);

        await interaction.reply(
            `Created list "${listName}".`
        );
    },
};