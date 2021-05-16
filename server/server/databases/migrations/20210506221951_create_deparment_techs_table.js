
exports.up = function (knex) {
    return knex.schema.createTable('deparment_techs', function (table) {
      table.increments();
      table.integer('deparmentId').nullable().index().references('id').inTable('deparments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('techId').nullable().index().references('id').inTable('tech_stacks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('deparment_techs');
  };
  