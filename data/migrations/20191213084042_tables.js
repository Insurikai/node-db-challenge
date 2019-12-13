exports.up = function(knex) {
  return knex.schema
    .createTable('Projects', table => {
      table.increments();
      table.text('Name').notNullable();
      table.text('Desc');
      table.boolean('Completed').defaultTo(false);
    })
    .createTable('Tasks', table => {
      table.increments();
      table.integer('ProjectID').notNullable();
      table.text('Desc').notNullable();
      table.text('Notes');
      table.boolean('Completed').defaultTo(false);
    })
    .createTable('Resources', table => {
      table.increments();
      table.text('Name').notNullable();
      table.text('Desc');
    })
    .createTable('ResourcesList', table => {
      table.increments();
      table
        .integer('ProjectID')
        .references('id')
        .inTable('Projects');
      table
        .integer('ResourcesID')
        .references('id')
        .inTable('Resources');
    });
};

exports.down = function(knex) {};
