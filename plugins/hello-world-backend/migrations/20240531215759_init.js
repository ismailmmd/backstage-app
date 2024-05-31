/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.createTable('user_settings', table => {
        table.comment('The table of user related settings');

        table.string('key').notNullable().comment('Key of a bucket value');
        table.text('value').notNullable().comment('The value');

        table.primary(['key']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('user_settings');
};
