const { SlashCommandBuilder } = require("discord.js");

const {
    loadData,
    saveData,
} = require("../../todo-data/storage");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("additem")
        .setDescription("add item to list")
        .addUserOption(option =>
            option
                .setName("user")
                .setRequired(true)
                .setDescription("user")
        )
        .addStringOption(option =>
            option
                .setName("cat")
                .setRequired(true)
                .setDescription("category")
        )
        .addStringOption(option =>
            option
                .setName("list-name")
                .setRequired(true)
                .setDescription("list name")
        )
        .addStringOption(option =>
            option
                .setName("content")
                .setRequired(true)
                .setDescription("item text")
        ),

    async execute(interaction) {
        const data = loadData();

        const userId =
            interaction.options.getUser("user").id;

        const cat =
            interaction.options.getString("cat");

        const listName =
            interaction.options.getString("list-name");

        const content =
            interaction.options.getString("content");

        if (!data[userId]?.[cat]?.[listName]) {
            await interaction.reply(
                "That list does not exist."
            );
            return;
        }

        data[userId][cat][listName].push({
            content,
            completed: false,
        });

        saveData(data);

        await interaction.reply(
            `Added "${content}" to "${listName}".`
        );
    },
};